from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework.views import APIView
from base.models import Users
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from .permissions import IsAdmin
from rest_framework import permissions
from base.serializer import CustomTokenObtainPairSerializer

from rest_framework.pagination import PageNumberPagination
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.exceptions import AuthenticationFailed
from  base.serializer import CustomTokenObtainPairSerializer,UserRegistrationSerializer
from base.models import Users  
from .permissions import IsAdmin
from django.db.models import Q


class AdminTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        try:
            email = request.data.get("email")
            password = request.data.get("password")

            if not Users.objects.filter(email=email).exists():
                return Response(
                    {"success": False, "message": "Admin account does not exist"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            user = Users.objects.get(email=email)

            if user.role != "admin":
                return Response(
                    {"success": False, "message": "User is not an admin"},
                    status=status.HTTP_403_FORBIDDEN
                )

            response = super().post(request, *args, **kwargs)
            token = response.data

            access_token = token["access"]
            refresh_token = token["refresh"]

            res = Response(status=status.HTTP_200_OK)
            res.data = {
                "success": True,
                "message": "Admin login successful",
                "userDetails": {
                    "user_id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "role": user.role
                }
            }

            res.set_cookie(
                key="access_token",
                value=access_token,
                httponly=True,
                secure=True,
                samesite="None",
                path='/',
                max_age=3600
            )

            res.set_cookie(
                key="refresh_token",
                value=refresh_token,
                httponly=True,
                secure=True,
                samesite="None",
                path='/',
                max_age=3600
            )

            return res

        except AuthenticationFailed:
            return Response(
                {"success": False, "message": "Invalid credentials"},
                status=status.HTTP_400_BAD_REQUEST
            )

        except Exception as e:
            return Response(
                {"success": False, "message": f"An error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class AdminTokenRefreshView(TokenRefreshView):
    permission_classes = [permissions.AllowAny]
    def post(self,request,*args,**kwargs):
        
        try:
            refresh_token = request.COOKIES.get("refresh_token")
            if not refresh_token:
                return Response(
                    {"success":False,"message":"referesh token not Found"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            request.data["refresh"] = refresh_token

            response = super().post(request,*args,**kwargs)

            if not "access" in response.data:
                return Response(
                    {"success":False,"message":"refresh token expired or invalid"},
                    status=status.HTTP_401_UNAUTHORIZED
                )
            
            token = response.data
            access_token = token["access"]
            res = Response(status=status.HTTP_201_CREATED)

            res.data = {"success":True,"message":"Access token refreshed"}

            res.set_cookie(
                key = "access_token",
                value=access_token,
                httponly=True,
                secure=True,
                samesite="None",
                path='/',
                max_age=3600
            )

            return res
        except Exception as e:
            return Response({"success":False,"message":f"An error occured: {str(e)}"},status=status.HTTP_400_BAD_REQUEST)
        
class Logout(APIView):
    permission_classes=[IsAdmin]
    def post(self,request):
        try:
            res = Response(status=status.HTTP_200_OK)
            res.data = {"success":True, "message":"logout successfully"}
            res.delete_cookie(
                key="access_token",
                path='/',
                samesite='None',
                
            )
            res.delete_cookie(
                key="refresh_token",
                path='/',
                samesite='None',
                
            )

            return res
        except Exception as e:
            return Response({"success":False , "message": f"Logout failed: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)


class AdminAllUser(APIView):
    permission_classes=[IsAdmin]
    def get(self,request):
        try: 
            search_query = request.GET.get('search', '')
            verified = request.GET.get('verified', None)
            users = Users.objects.filter(role="user").order_by('id')

            if search_query:
                users = users.filter(
                    Q(username__icontains=search_query) |
                    Q(email__icontains=search_query) |
                    Q(phone_no__icontains=search_query)
                )
            if verified is not None:
                if verified.lower() == 'true':
                    users = users.filter(is_verified=True)
                elif verified.lower() == 'false':
                    users = users.filter(is_verified=False)
            paginator = PageNumberPagination()
            paginator.page_size = 7
            result_page = paginator.paginate_queryset(users, request)
            serializer = UserRegistrationSerializer(result_page,many=True)
            return paginator.get_paginated_response({
                "success": True,
                "message": "All users retrieved successfully",
                "users": serializer.data
            })
        except Exception as e:
            return Response({"success":False,"message":f"An error occured: {str(e)}"},status=status.HTTP_400_BAD_REQUEST)
            
class VerifyUsers(APIView):
    permission_classes=[IsAdmin]
    def get(self,request):
        try: 
            search_query = request.GET.get('search', '')
            users = Users.objects.filter(
                Q(role="user") & 
                Q(gov_url__isnull=False) & 
                Q(gov_status="pending")
            ).order_by('id').order_by('id')

            if search_query:
                users = users.filter(
                    Q(username__icontains=search_query) |
                    Q(email__icontains=search_query) |
                    Q(phone_no__icontains=search_query)
                )

            paginator = PageNumberPagination()
            paginator.page_size = 7
            result_page = paginator.paginate_queryset(users, request)
            serializer = UserRegistrationSerializer(result_page,many=True)
            return paginator.get_paginated_response({
                "success": True,
                "message": "All users retrieved successfully",
                "users": serializer.data
            })
        except Exception as e:
            return Response({"success":False,"message":f"An error occured: {str(e)}"},status=status.HTTP_400_BAD_REQUEST)