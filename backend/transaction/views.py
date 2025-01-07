from django.contrib.auth.models import User
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import PermissionDenied
from .models import Transaction, Account, Profile   
from .permissions import IsCustomer
import json
from decimal import Decimal
import pandas as pd
from django.db.models import Sum
# Create your views here.

@api_view(['GET'])
def index(request):
    return Response({'message': 'Hello, world!'})
@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    data = json.loads(request.body)
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    email = data.get('email')
    password = data.get('password')

    if not first_name or not last_name or not email or not password:
        return JsonResponse({'error': 'All fields are required.'}, status=400)

    user = User.objects.create_user(username=email, first_name=first_name, last_name=last_name, email=email, password=password)
    Profile.objects.create(user=user, user_type='customer')

    return JsonResponse({'message': 'User created successfully.'}, status=201)
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated, IsCustomer])
def customer_transaction_list(request):
    if request.method == 'GET':
        transactions = Transaction.objects.filter(account__profile__user=request.user)
        transactions_data = [
            {
                'id': transaction.id,
                'date': transaction.date,
                'account': transaction.account.account_number,
                'transaction_type': transaction.transaction_type,
                'description': transaction.description,
                'amount': transaction.amount,
                'available_balance': transaction.available_balance,
            }
            for transaction in transactions
        ]
        return JsonResponse(transactions_data, safe=False)
    elif request.method == 'POST':
        data = json.loads(request.body)
        account = Account.objects.get(account_number=data['account'])
        if account.profile.user != request.user:
            raise PermissionDenied("You do not have permission to create a transaction for this account.")
        amount = Decimal(data['amount'])
        print(account.balance, amount, data['transaction_type'], account.balance + amount if data['transaction_type'] == 'deposit' else account.balance - amount) 
        transaction = Transaction.objects.create(
            account=account,
            transaction_type=data['transaction_type'],
            description=data['description'],
            amount=data['amount'],
            available_balance=account.balance + amount  if data['transaction_type'] == 'deposit' else account.balance - amount
        )
        account.balance = transaction.available_balance
        account.save()
        return JsonResponse({
            'id': transaction.id,
            'date': transaction.date,
            'account': transaction.account.account_number,
            'transaction_type': transaction.transaction_type,
            'description': transaction.description,
            'amount': transaction.amount,
            'available_balance': transaction.available_balance,
        }, status=201)

@api_view(['POST']) 
@permission_classes([IsAuthenticated, IsCustomer])  
def upload_transactions(request):
    file=request.FILES['file']
    if not file:
        return JsonResponse({'error': 'No file uploaded.'}, status=400)
    try:
        df= pd.read_excel(file)
        for _, row in df.iterrows():
            account_number = row['account_number']
            transaction_type = row['transaction_type']
            description = row['description']
            amount = row['amount']
            try:
                account = Account.objects.get(account_number=account_number, profile__user=request.user)
            except Account.DoesNotExist:
                return JsonResponse({'error': f'Account with account number {account_number} does not exist.'}, status=400) 

            if Transaction.objects.filter(account=account, transaction_type=transaction_type, description=description, amount=amount).exists():
                continue  

            if transaction_type == 'deposit':
                available_balance = account.balance + amount
            else:
                available_balance = account.balance - amount

            Transaction.objects.create(
                account=account,
                transaction_type=transaction_type,
                description=description,
                amount=amount,
                available_balance=available_balance
            )

            account.balance = available_balance
            account.save()

        return JsonResponse({'message': 'Transactions uploaded successfully.'}, status=201)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

@api_view(['GET'])
@permission_classes([IsAuthenticated, IsCustomer])
def transaction_summary(request):
    transactions = Transaction.objects.filter(account__profile__user=request.user)
    # print(transactions)
    # summary = {
    #     'total_deposits': sum(transaction.amount for transaction in transactions if transaction.transaction_type == 'deposit'),
    #     'total_withdrawals': sum(transaction.amount for transaction in transactions if transaction.transaction_type == 'withdrawal'),
    #     'total_transactions': transactions.count(),
    # }
    summary = transactions.values('transaction_type').annotate(total_amount=Sum('amount'))
    print(summary)
    return JsonResponse(list(summary), safe=False)

@api_view(['GET'])
@permission_classes([IsAuthenticated, IsCustomer])
def account_balance(request):
    accounts = Account.objects.filter(profile__user=request.user)
    balance_data = accounts.values('account_number', 'balance')
    return JsonResponse(list(balance_data), safe=False)

@api_view(['GET'])
@permission_classes([IsAuthenticated, IsCustomer])
def monthly_transactions(request):
    transactions = Transaction.objects.filter(account__profile__user=request.user)
    monthly_data = transactions.annotate(month=TruncMonth('date')).values('month').annotate(total_amount=Sum('amount'))
    return JsonResponse(list(monthly_data), safe=False)





