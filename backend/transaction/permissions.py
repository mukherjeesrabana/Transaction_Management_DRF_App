from rest_framework.permissions import BasePermission

class IsBankManager(BasePermission):
    def has_permission(self, request, view):
        return request.user.profile.user_type == 'manager'

class IsCustomer(BasePermission):
    def has_permission(self, request, view):
        return request.user.profile.user_type == 'customer'

class IsCustomerOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return True
        return request.user.profile.user_type == 'customer'