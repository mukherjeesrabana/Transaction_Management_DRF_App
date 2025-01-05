from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from .models import Transaction, Account
from .permissions import IsCustomer
import json
from decimal import Decimal
# Create your views here.

@api_view(['GET'])
def index(request):
    return Response({'message': 'Hello, world!'})
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
    


# class CustomerTransactionList(generics.ListCreateAPIView):
#     serializer_class = TransactionSerializer
#     permission_classes = [IsAuthenticated, IsCustomer]
#     def get_queryset(self):
#         return Transaction.objects.filter(account__profile__user=self.request.user)
# class CustomerAccountList(generics.ListCreateAPIView):
#     serializer_class = AccountSerializer
#     permission_classes = [IsAuthenticated, IsCustomer]
#     def get_queryset(self):
#         return Account.objects.filter(profile__user=self.request.user)
# class AccountTransactionList(generics.ListCreateAPIView):
#     serializer_class = TransactionSerializer

#     permission_classes = [IsAuthenticated, IsCustomer]
#     def get_queryset(self):
#         return Transaction.objects.filter(account__id=self.kwargs['account_id'])

# class CustomerTransactionCreateView(generics.CreateAPIView):
    
    # serializer_class = TransactionSerializer
    # permission_classes = [IsAuthenticated, IsCustomer]

    # def perform_create(self, serializer):
    #     account = serializer.validated_data['account']
    #     if account.profile.user != self.request.user:
    #         raise PermissionDenied("You do not have permission to create a transaction for this account.")
    #     serializer.save()
    # def perform_update(self, serializer):
    #     account = serializer.validated_data['account']
    #     if account.profile.user != self.request.user:
    #         raise PermissionDenied("You do not have permission to update a transaction for this account.")
    #     serializer.save()   
    # def perform_destroy(self, serializer):
    #     account = serializer.validated_data['account']
    #     if account.profile.user != self.request.user:
    #         raise PermissionDenied("You do not have permission to delete a transaction for this account.")
    #     serializer.delete()