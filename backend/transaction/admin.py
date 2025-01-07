from django.contrib import admin
from .models import Profile, Account, CustomerTransaction

# Register your models here.
admin.site.register(Profile)
admin.site.register(Account)
admin.site.register(CustomerTransaction)

