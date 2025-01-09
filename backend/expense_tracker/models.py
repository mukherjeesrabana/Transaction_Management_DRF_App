from django.db import models
from django.contrib.auth.models import User

TRANSACTION_TYPE_CHOICES = (
    ('Expense', 'Expense'),
    ('Credit', 'Credit')
)

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
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.date} - {self.amount} - {self.category.category_name}"