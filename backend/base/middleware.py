from django.http import JsonResponse
from base.authentication import CoustomJWTAuthentication
from rest_framework.exceptions import AuthenticationFailed

class CheckBlockedUserMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        self.jwt_authenticator = CoustomJWTAuthentication()

    def __call__(self, request):
        try:
            user_auth_tuple = self.jwt_authenticator.authenticate(request)
            if user_auth_tuple is not None:
                user, _ = user_auth_tuple
                if getattr(user, 'status', '') == 'blocked':
                    return JsonResponse({'detail': 'Your account has been blocked.'}, status=403)
        except AuthenticationFailed:
            pass 
        return self.get_response(request)