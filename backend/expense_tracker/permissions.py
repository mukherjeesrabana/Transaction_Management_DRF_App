from rest_framework.permissions import BasePermission

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.systemuser.user_type == 'Admin User'

class IsStandardUser(BasePermission):
    def has_permission(self, request, view):
        print(request.user)
        return request.user.systemuser.user_type == 'Standard User'

class IsStandardUserOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return True
        return request.user.systemuser.user_type == 'Standard User'