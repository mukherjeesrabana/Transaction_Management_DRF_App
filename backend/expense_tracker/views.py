from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import SystemUser, Category, Transaction
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
import json
from django.db.models import Sum
from django.db.models.functions import TruncMonth
from django.utils.timezone import now
from datetime import datetime
import pandas as pd
from .permissions import IsAdmin, IsStandardUser


@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    data = json.loads(request.body)
    user_type = 'Standard User'
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    username = data.get('email')
    email = data.get('email')
    password = data.get('password')

    if not first_name or not last_name or not email or not password:
        return JsonResponse({'error': 'All fields are required.'}, status=400)
    if User.objects.filter(username=username).exists():
        return JsonResponse({'error': 'Username already exists.'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, email=email, password=password)
    SystemUser.objects.create(user=user, user_type=user_type)
    return JsonResponse({'message': 'User created successfully.'}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([AllowAny])
def signin(request):
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return JsonResponse({'error': 'All fields are required.'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.filter(username=username).first()
    system_user = SystemUser.objects.filter(user=user).first()
    
    if user is None or not user.check_password(password):
        return JsonResponse({'error': 'Invalid credentials.'}, status=status.HTTP_400_BAD_REQUEST)

    refresh = RefreshToken.for_user(user)
    return JsonResponse({
        'refresh': str(refresh),
        'access': str(refresh.access_token),
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email,
        'user_type': system_user.user_type,
        'status': system_user.status
    })

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def category_list(request):
    if request.method == 'GET':
        categories = Category.objects.all()
        data = [{"id": category.id, "category_name": category.category_name} for category in categories]
        return JsonResponse(data, safe=False)
    elif request.method == 'POST':
        data = json.loads(request.body)
        category_name = data.get('category_name')
        if Category.objects.filter(category_name=category_name).exists():
            return JsonResponse({'error': 'Category already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        category = Category.objects.create(category_name=category_name)
        return JsonResponse({"id": category.id, "category_name": category.category_name}, status=status.HTTP_201_CREATED)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def edit_category(request, category_id):
    try:
        category = Category.objects.get(id=category_id)
    except Category.DoesNotExist:
        return JsonResponse({'error': 'Category not found'}, status=status.HTTP_404_NOT_FOUND)
   
    data = json.loads(request.body)
    
    category.category_name = data.get('category_name', category.category_name)
    category.save()

    return JsonResponse({
        "id": category.id,
        "category_name": category.category_name
    }, status=status.HTTP_200_OK)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_category(request, category_id):
    try:
        category = Category.objects.get(id=category_id)
    except Category.DoesNotExist:
        return JsonResponse({'error': 'Category not found'}, status=status.HTTP_404_NOT_FOUND)

    category.delete()
    return JsonResponse({'message': 'Category deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated, IsStandardUser])
def transaction_list(request):
    if request.method == 'GET':
        transactions = Transaction.objects.filter(transaction_user__user=request.user)
        data = [
            {
                "id": transaction.id,
                "date": transaction.date,
                "transaction_type": transaction.transaction_type,
                "amount": transaction.amount,
                "category": transaction.category.category_name,
                "description": transaction.description,
                "transaction_user": transaction.transaction_user.user.username
            }
            for transaction in transactions
        ]
        return JsonResponse(data, safe=False)
    elif request.method == 'POST':
        data = json.loads(request.body)
        date = data.get('date')
        transaction_type = data.get('transaction_type')
        amount = data.get('amount')
        category_id = data.get('category')
        description = data.get('description')
        category = Category.objects.get(id=category_id)
        system_user = SystemUser.objects.get(user=request.user)
        transaction = Transaction.objects.create(
            date=date,
            transaction_type=transaction_type,
            amount=amount,
            category=category,
            description=description,
            transaction_user=system_user
        )
        return JsonResponse({
            "id": transaction.id,
            "date": transaction.date,
            "transaction_type": transaction.transaction_type,
            "amount": transaction.amount,
            "category": transaction.category.category_name,
            "description": transaction.description,
            "transaction_user": transaction.transaction_user.user.username
        }, status=status.HTTP_201_CREATED)

@api_view(['PUT'])
@permission_classes([IsAuthenticated, IsStandardUser])
def edit_transaction(request, transaction_id):
    try:
        transaction = Transaction.objects.get(id=transaction_id, transaction_user__user=request.user)
    except Transaction.DoesNotExist:
        return JsonResponse({'error': 'Transaction not found'}, status=status.HTTP_404_NOT_FOUND)

    data = json.loads(request.body)
    transaction.date = data.get('date', transaction.date)
    transaction.transaction_type = data.get('transaction_type', transaction.transaction_type)
    transaction.amount = data.get('amount', transaction.amount)
    transaction.category_id = data.get('category', transaction.category_id)
    transaction.description = data.get('description', transaction.description)
    transaction.save()

    return JsonResponse({
        "id": transaction.id,
        "date": transaction.date,
        "transaction_type": transaction.transaction_type,
        "amount": transaction.amount,
        "category": transaction.category.category_name,
        "description": transaction.description,
        "transaction_user": transaction.transaction_user.user.username
    }, status=status.HTTP_200_OK)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated, IsStandardUser])
def delete_transaction(request, transaction_id):
    try:
        transaction = Transaction.objects.get(id=transaction_id, transaction_user__user=request.user)
    except Transaction.DoesNotExist:
        return JsonResponse({'error': 'Transaction not found'}, status=status.HTTP_404_NOT_FOUND)

    transaction.delete()
    return JsonResponse({'message': 'Transaction deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
@permission_classes([IsAuthenticated, IsStandardUser])
def upload_transactions(request):
    file = request.FILES['file']
    
    df = pd.read_excel(file)

    if not file:
        return JsonResponse({'error': 'No file uploaded.'}, status=400)

    for _, row in df.iterrows():
        category_name = row['category']
        category, created = Category.objects.get_or_create(category_name=category_name)

        if row['transaction_type'] not in ['Expense', 'Credit']:
            return JsonResponse({'error': 'Invalid transaction type'}, status=status.HTTP_400_BAD_REQUEST)
        system_user = SystemUser.objects.get(user=request.user)
        Transaction.objects.create(
            date=row['date'],
            transaction_type=row['transaction_type'],
            amount=row['amount'],
            category=category,
            description=row['description'],
            transaction_user=system_user
        )
    return JsonResponse({'message': 'Transactions uploaded successfully'}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_categories(request):
    file = request.FILES['file']
   
    df = pd.read_excel(file)

    if not file:
        return JsonResponse({'error': 'No file uploaded.'}, status=400)

    for _, row in df.iterrows():
        Category.objects.create(
            category_name=row['category_name']
        )

    return JsonResponse({'message': 'Categories uploaded successfully'}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@permission_classes([IsAuthenticated, IsStandardUser])
def monthly_transactions(request, year, month):
    transactions = Transaction.objects.filter(
        transaction_user__user=request.user,
        date__year=year,
        date__month=month,
    )
    data = [
            {
                "id": transaction.id,
                "date": transaction.date,
                "transaction_type": transaction.transaction_type,
                "amount": transaction.amount,
                "category": transaction.category.category_name,
                "description": transaction.description,
                "transaction_user": transaction.transaction_user.user.username
            }
            for transaction in transactions
        ]
    return JsonResponse(data, safe=False)


@api_view(['GET'])
@permission_classes([IsAuthenticated, IsStandardUser])
def monthly_expenses_by_category(request, year, month):
    transactions = Transaction.objects.filter(
        transaction_user__user=request.user,
        date__year=year,
        date__month=month,
        transaction_type='Expense'
    )
    breakdown = transactions.values('category__category_name', 'description').annotate(total_amount=Sum('amount')).order_by('-total_amount')
    data = [{"category": item['category__category_name'], "description": item['description'], "total_amount": item['total_amount']} for item in breakdown]
    return JsonResponse(data, safe=False)

@api_view(['GET'])
@permission_classes([IsAuthenticated, IsStandardUser])
def monthly_credits_by_category(request, year, month):
    transactions = Transaction.objects.filter(
        transaction_user__user=request.user,
        date__year=year,
        date__month=month,
        transaction_type='Credit'
    )
    breakdown = transactions.values('category__category_name', 'description').annotate(total_amount=Sum('amount')).order_by('-total_amount')
    data = [{"category": item['category__category_name'], "description": item['description'], "total_amount": item['total_amount']} for item in breakdown]
    return JsonResponse(data, safe=False)


@api_view(['GET'])
@permission_classes([IsAuthenticated, IsStandardUser])
def monthly_overall_overview(request, year, month):
    total_credits = Transaction.objects.filter(
        transaction_user__user=request.user,
        date__year=year,
        date__month=month,
        transaction_type='Credit'
    ).aggregate(total_amount=Sum('amount'))['total_amount'] or 0
    total_expenses = Transaction.objects.filter(
        transaction_user__user=request.user,
        date__year=year,
        date__month=month,
        transaction_type='Expense'
    ).aggregate(total_amount=Sum('amount'))['total_amount'] or 0
    available_balance = total_credits - total_expenses
    return JsonResponse({
        "total_credits": total_credits,
        "total_expenses": total_expenses,
        "available_balance": available_balance
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated, IsStandardUser])
def monthly_categorywise_breakdown(request, year, month):
    transactions = Transaction.objects.filter(
        transaction_user__user=request.user,
        date__year=year,
        date__month=month
    )
    breakdown = transactions.values('category__category_name', 'description', 'transaction_type').annotate(total_amount=Sum('amount')).order_by('-total_amount')
    data = [{"category": item['category__category_name'], "description": item['description'], "transaction_type": item['transaction_type'], "total_amount": item['total_amount']} for item in breakdown]
    return JsonResponse(data, safe=False)







@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated, IsAdmin])
def userlist(request):
    if request.method=='GET':
        users= SystemUser.objects.filter(user_type='Standard User')
        data= [{

            'first_name':user.user.first_name,
            'last_name':user.user.last_name,
            'email':user.user.email,
            'username':user.user.username,
            'user_type':user.user_type,
            'status':user.status,

        } for user in users]
        return JsonResponse(data, safe=False)
    elif request.method=='POST':
        print(request.body)
        data= json.loads(request.body)
        first_name= data.get('first_name')
        last_name= data.get('last_name')
        email= data.get('email')
        password= data.get('password')
        username= data.get('email')
       

        if not first_name or not last_name or not email:
            return JsonResponse({'error':'All fields are not provided'}, status=400)
        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': f"User with email id {email} already exists."}, status=status.HTTP_400_BAD_REQUEST)
        user= User.objects.create_user(username= username, first_name= first_name, last_name= last_name, email=email, password=password)

        SystemUser.objects.create(user=user, user_type= 'Standard User', status='Active')

        return JsonResponse({'message': 'User created successfully.'}, status=status.HTTP_201_CREATED)
    



@api_view(['PUT'])
@permission_classes([IsAuthenticated, IsAdmin])
def editUser(request, email):
    try:
        user = User.objects.get(username= email, email=email)
        
    except User.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    
    data = json.loads(request.body)
    user.first_name= data.get('first_name', user.first_name)
    user.last_name= data.get('last_name', user.last_name)
    
    user.save()
    system_user= SystemUser.objects.get(user=user)
    return JsonResponse({
        "id": user.id,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "email": user.email,
        "user_type": system_user.user_type,
        
    }, status=status.HTTP_200_OK)




@api_view(['PUT'])
@permission_classes([IsAuthenticated, IsAdmin])
def changeUserStatus(request, email):
    try:
        user= User.objects.get(username=email, email=email)
    except:
        if User.DoesNotExist:
            return JsonResponse({'error':"User Not found"}, status=400)
    data= json.loads(request.body)
    system_user= SystemUser.objects.get(user=user)
    system_user.status=data.get("status", system_user.status)
    system_user.save()
    return JsonResponse({'message':"User deactivated"}, status=200)


@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdmin])
def upload_users(request):
    file = request.FILES['file']
    
    df = pd.read_excel(file)

    if not file:
        return JsonResponse({'error': 'No file uploaded.'}, status=400)

    for _, row in df.iterrows():
        email=row['email']
        if User.objects.filter(username=email).exists():
            return JsonResponse({'error': f"User with email id {email} already exists."}, status=status.HTTP_400_BAD_REQUEST)
        
        user= User.objects.create_user(username= row['email'], first_name= row['first_name'], last_name= row['last_name'], email=row['email'], password=row['password'])

        SystemUser.objects.create(user=user, user_type= 'Standard User', status='Active')
        
       
    return JsonResponse({'message': 'Users uploaded successfully'}, status=status.HTTP_201_CREATED)



















@api_view(['GET'])
@permission_classes([IsAuthenticated, IsStandardUser])
def monthly_total_credits(request, year, month):
    total_credits = Transaction.objects.filter(
        transaction_user__user=request.user,
        date__year=year,
        date__month=month,
        transaction_type='Credit'
    ).aggregate(total_amount=Sum('amount'))['total_amount'] or 0
    return JsonResponse({"total_credits": total_credits})

@api_view(['GET'])
@permission_classes([IsAuthenticated, IsStandardUser])
def monthly_total_expenses(request, year, month):
    total_expenses = Transaction.objects.filter(
        transaction_user__user=request.user,
        date__year=year,
        date__month=month,
        transaction_type='Expense'
    ).aggregate(total_amount=Sum('amount'))['total_amount'] or 0
    return JsonResponse({"total_expenses": total_expenses})

@api_view(['GET'])
@permission_classes([IsAuthenticated, IsStandardUser])
def monthly_available_balance(request, year, month):
    total_credits = Transaction.objects.filter(
        transaction_user__user=request.user,
        date__year=year,
        date__month=month,
        transaction_type='Credit'
    ).aggregate(total_amount=Sum('amount'))['total_amount'] or 0
    total_expenses = Transaction.objects.filter(
        transaction_user__user=request.user,
        date__year=year,
        date__month=month,
        transaction_type='Expense'
    ).aggregate(total_amount=Sum('amount'))['total_amount'] or 0
    available_balance = total_credits - total_expenses
    return JsonResponse({"available_balance": available_balance})

