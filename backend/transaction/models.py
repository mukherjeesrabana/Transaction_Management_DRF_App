from django.db import models
from django.contrib.auth.models import User

USER_TYPE_CHOICES = (
    ('manager', 'Bank Manager'),
    ('customer', 'Customer'),
)

TRANSACTION_TYPE_CHOICES = (
    ('deposit', 'Deposit'),
    ('withdrawal', 'Withdrawal'),
    ('transfer', 'Transfer'),
)


# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES, default='customer')
    
    def __str__(self):
        return self.user.username

class Account(models.Model):
    profile = models.ForeignKey('Profile', on_delete=models.CASCADE)
    account_number = models.CharField(max_length=20)
    account_name = models.CharField(max_length=255)
    balance = models.DecimalField(max_digits=10, decimal_places=2)
    
    def __str__(self):
        return self.account_name

class Transaction(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    account = models.ForeignKey('Account', on_delete=models.CASCADE)
    transaction_type =models.CharField(max_length=20, choices=TRANSACTION_TYPE_CHOICES, default='deposit')
    description = models.TextField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    available_balance = models.DecimalField(max_digits=10, decimal_places=2)
    
    def __str__(self):
        return self.account.account_name + ' ' + self.transaction_type
