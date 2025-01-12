from django.contrib import admin
from .models import Category, Transaction, SystemUser

admin.site.register(Category)
admin.site.register(Transaction)
admin.site.register(SystemUser)