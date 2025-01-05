from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Account, Transaction

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']
    

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    
    class Meta:
        model = Profile
        fields = ['user', 'user_type']
    def create(self, validated_data):  
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data)
        profile = Profile.objects.create(user=user, **validated_data)
        return profile
class AccountSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()
    
    class Meta:
        model = Account
        fields = ['id', 'profile', 'account_number', 'account_name', 'balance']
    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        user_data = profile_data.pop('user')
        user = User.objects.create_user(**user_data)
        profile = Profile.objects.create(user=user, **profile_data)
        account = Account.objects.create(profile=profile, **validated_data)
        return account
    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile')
        user_data = profile_data.pop('user')
        user = instance.profile.user
        user.first_name = user_data.get('first_name', user.first_name)
        user.last_name = user_data.get('last_name', user.last_name)
        user.email = user_data.get('email', user.email)
        user.save()
        instance.profile.user_type = profile_data.get('user_type', instance.profile.user_type)
        instance.profile.save()
        instance.account_name = validated_data.get('account_name', instance.account_name)
        instance.save()
        return instance
class TransactionSerializer(serializers.ModelSerializer):
    account = serializers.PrimaryKeyRelatedField(queryset=Account.objects.all())

    class Meta:
        model = Transaction
        fields = ['id', 'date', 'account', 'transaction_type', 'description', 'amount', 'available_balance']
        read_only_fields = ['available_balance']

    def create(self, validated_data):
        account = validated_data['account']
        amount = validated_data['amount']
        if validated_data['transaction_type'] == 'deposit':
            account.balance += amount
        else:
            account.balance -= amount
        account.save()
        validated_data['available_balance'] = account.balance
        return super().create(validated_data)
    def update(self, instance, validated_data):
        account = instance.account
        amount = validated_data['amount']
        if validated_data['transaction_type'] == 'deposit':
            account.balance += amount
        else:
            account.balance -= amount
        account.save()
        validated_data['available_balance'] = account.balance
        return super().update(instance, validated_data)

    def validate(self, data):
        account = data['account']
        amount = data['amount']
        if data['transaction_type'] == 'withdrawal' and amount > account.balance:
            raise serializers.ValidationError("Insufficient funds")
        return data
    def delete(self, instance):
        account = instance.account
        if instance.transaction_type == 'deposit':
            account.balance -= instance.amount
        else:
            account.balance += instance.amount
        account.save()
        instance.delete()
        return instance 
    