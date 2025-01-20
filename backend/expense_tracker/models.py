from django.db import models
from django.contrib.auth.models import User
from datetime import datetime

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

def getCategory():
    category, created= Category.objects.get_or_create(category_name='Households')
    return category

def getSubCategory():
    category= getCategory()
    sub_category, created= SubCategory.objects.get_or_create(category=category)
    return sub_category.id

class SystemUser(models.Model):
   
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    user_type = models.CharField(max_length=30, choices=USER_TYPE_CHOICES, default="Standard User")
   
    def __str__(self):
        return f"{self.id}-- {self.user.username}"


class Category(models.Model):
    category_name = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.id}-- {self.category_name}"
class SubCategory(models.Model):
    category= models.ForeignKey(Category, on_delete= models.CASCADE)
    subcategory_name= models.CharField(max_length=30)

    def __str__(self):
        return f"{self.id}-- {self.category.category_name} {self.subcategory_name}"

class Transaction(models.Model):
    date = models.DateField()
    transaction_type = models.CharField(max_length=20, choices=TRANSACTION_TYPE_CHOICES, default='Expense')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    subcategory= models.ForeignKey(SubCategory, on_delete= models.CASCADE, default= getSubCategory)
    description = models.TextField()
    transaction_user = models.ForeignKey(SystemUser, on_delete=models.CASCADE, default=getSystemUser)

    def __str__(self):
        return f"{self.id}-- {self.transaction_user.user.username} {self.date} - {self.amount} - {self.category.category_name}"