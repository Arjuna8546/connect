from rest_framework.permissions import BasePermission
from base.authentication import CoustomJWTAuthentication

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        
        authenticator = CoustomJWTAuthentication()
        
        try:
            user,token = authenticator.authenticate(request)
            return token.get('role') == 'admin'
        except:
            return False