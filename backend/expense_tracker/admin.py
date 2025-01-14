from django.contrib import admin
from .models import Category, Transaction, SystemUser, SubCategory

admin.site.register(Category)
admin.site.register(SubCategory)
admin.site.register(Transaction)
admin.site.register(SystemUser)