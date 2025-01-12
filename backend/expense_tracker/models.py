from django.db import models
from django.contrib.auth.models import User

TRANSACTION_TYPE_CHOICES = (
    ('Expense', 'Expense'),
    ('Credit', 'Credit')
)
USER_TYPE_CHOICES = (
    ('Admin User', 'Admin User'),
    ('Standard User', 'Standard User'),
)
USER_STATUS_CHOICES = (
    ('Active', 'Active'),
    ('Inactive', 'Inactive'),
)

def getUser():
    user, created = User.objects.get_or_create(username='bwilson@example.com', defaults={'email': 'bwilson@example.com', 'password': 'defaultpassword'})
    return user

def getSystemUser():
    user = getUser()
    system_user, created = SystemUser.objects.get_or_create(user=user)
    return system_user.id

class SystemUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    user_type = models.CharField(max_length=30, choices=USER_TYPE_CHOICES, default="Standard User")
    status= models.CharField(max_length=20, choices=USER_STATUS_CHOICES, default="Active")
    def __str__(self):
        return self.user.username


class Category(models.Model):
    category_name = models.CharField(max_length=20)

    def __str__(self):
        return self.category_name

class Transaction(models.Model):
    date = models.DateField()
    transaction_type = models.CharField(max_length=20, choices=TRANSACTION_TYPE_CHOICES, default='Expense')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    description = models.TextField()
    transaction_user = models.ForeignKey(SystemUser, on_delete=models.CASCADE, default=getSystemUser)

    def __str__(self):
        return f"{self.transaction_user.user.username} {self.date} - {self.amount} - {self.category.category_name}"