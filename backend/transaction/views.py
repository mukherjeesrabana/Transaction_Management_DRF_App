from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import generics
from .models import Profile, Account, Transaction
from .serializers import ProfileSerializer, AccountSerializer, TransactionSerializer
from rest_framework.permissions import IsAuthenticated
from .permissions import IsCustomer, IsCustomerOrReadOnly, IsBankManager
# IsCustomerOrAccountOwner, IsCustomerOrTransactionOwner, IsCustomerOrAccountOwnerOrBankManager
# Create your views here.

@api_view(['GET'])
def index(request):
    return Response({'message': 'Hello, world!'})


class CustomerTransactionList(generics.ListCreateAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated, IsCustomer]
    def get_queryset(self):
        return Transaction.objects.filter(account__profile__user=self.request.user)
class CustomerAccountList(generics.ListCreateAPIView):
    serializer_class = AccountSerializer
    permission_classes = [IsAuthenticated, IsCustomer]
    def get_queryset(self):
        return Account.objects.filter(profile__user=self.request.user)
class AccountTransactionList(generics.ListCreateAPIView):
    serializer_class = TransactionSerializer

    permission_classes = [IsAuthenticated, IsCustomer]
    def get_queryset(self):
        return Transaction.objects.filter(account__id=self.kwargs['account_id'])

class CustomerTransactionCreateView(generics.CreateAPIView):
    
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated, IsCustomer]

    def perform_create(self, serializer):
        account = serializer.validated_data['account']
        if account.profile.user != self.request.user:
            raise PermissionDenied("You do not have permission to create a transaction for this account.")
        serializer.save()
    def perform_update(self, serializer):
        account = serializer.validated_data['account']
        if account.profile.user != self.request.user:
            raise PermissionDenied("You do not have permission to update a transaction for this account.")
        serializer.save()   
    def perform_destroy(self, serializer):
        account = serializer.validated_data['account']
        if account.profile.user != self.request.user:
            raise PermissionDenied("You do not have permission to delete a transaction for this account.")
        serializer.delete()