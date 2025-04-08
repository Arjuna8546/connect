from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework.views import APIView
from .models import Users
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from http import HTTPStatus
from .serializer import UserRegistrationSerializer
from rest_framework import permissions

from django.core.mail import send_mail
from django.conf import settings
from django.core.cache import cache
import random
import time

class CoustomTokenObtainPairView(TokenObtainPairView):
    permission_classes = [permissions.AllowAny]
    def post(self, request,*args, **kwargs):

        try:
            email=request.data.get("email")
            password=request.data.get("password")

            if not Users.objects.filter(email=email).exists():
                return Response(
                    {"success":False,"message":"User with this account does not exist"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            response = super().post(request,*args, **kwargs)
            token = response.data

            access_token = token["access"]
            refresh_token = token["refresh"]

            res = Response(status=status.HTTP_200_OK)

            user = Users.objects.get(email=email)
            res.data = {"success":True,"message":"user login successfully","userDetails":{"user_id":user.id,"username":user.username,"email":user.email,"date_of_birth":user.date_of_birth,"phone_no":user.phone_no,"gender":user.gender,"profileUrl":user.profile_url,"status":user.status,"verified":user.is_verified,"bio":user.bio,"gov_url":user.gov_url,"gov_status":user.gov_status}}

            res.set_cookie(
                key = "access_token",
                value=access_token,
                httponly=True,
                secure=True,
                samesite="None",
                path='/',
                max_age=3600
            )

            res.set_cookie(
                key = "refresh_token",
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
                {"success":False,"message":"Invalid Credentials"},
                status=status.HTTP_400_BAD_REQUEST
            )

        except Exception as e:
            return Response(
                {"success":False,"message":f"An error occured: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class CoustomTokenRefreshView(TokenRefreshView):
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
    permission_classes=[permissions.IsAuthenticated]
    
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

def generate_otp():
    return str(random.randint(10000,99999))

def sent_otp_email(email,otp):
    subject = "Your OTP Code"
    message = f"Hello,\n\n Your OTP for account Verification is :{otp}.\n\nUse this to complete your registration."
    send_mail(subject, message, settings.EMAIL_HOST_USER, [email], fail_silently=False)

def store_otp_in_redis(email,otp,expiration=300):
    expiration_time = int(time.time()) + expiration
    cache.set(f"otp:{email}",{"otp": otp, "expires_at": expiration_time})

def get_otp_from_redis(email):
    otp_data = cache.get(f"otp:{email}")
    if otp_data:
        return otp_data["otp"],otp_data["expires_at"]
    return None,None
def delete_otp_from_redis(email):
    cache.delete(f"otp:{email}")

class Register(APIView):
    authentication_classes = []
    permission_classes = [permissions.AllowAny]

    def post(self,request):
        serializer = UserRegistrationSerializer(data = request.data)
        if serializer.is_valid():
            otp = generate_otp()
            email =  serializer.validated_data["email"]

            store_otp_in_redis(email,otp)
            sent_otp_email(email,otp)

            return Response(
                {"success":True,"message":f"OTP sent to {email}. Verify to complete registration."},
                status=status.HTTP_201_CREATED
            )
        return Response(
            {"success":False,"errors":serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )
    
class VerifyOtp(APIView):
    authentication_classes = []
    permission_classes = [permissions.AllowAny]

    def post(self,request):
        email = request.data.get("email")
        otp = request.data.get("otp")

        stored_otp,expire_time = get_otp_from_redis(email)

        if stored_otp is None or expire_time < int(time.time()):
            return Response(
                {"success":False,"message":"otp expired or invalid"},
                status=status.HTTP_400_BAD_REQUEST
            )
        if stored_otp!=otp:
            return Response(
                {"success":False,"message":"Invalid OTP"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        user_data = request.data.copy()
        user_data.pop("otp")
        serializer  = UserRegistrationSerializer(data = request.data)

        if serializer.is_valid():
            serializer.save()
            delete_otp_from_redis(email)

            return Response(
                {"success":True,"message":"OTP verified. Account created successfully."},
                status=status.HTTP_201_CREATED
            )
        return Response(
            {"success":True,"message":"OTP verified. Account created successfully."},
            status = status.HTTP_400_BAD_REQUEST
        )
    
class UpdateUser(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def patch(self, request):
        try:
            user = Users.objects.get(id=request.data["user_id"])
            serializer = UserRegistrationSerializer(user, data=request.data, partial=True)
            if serializer.is_valid():
                user = serializer.save()
                return Response({
                    "success": True,
                    "message": "Profile updated successfully",
                    "userDetails": {
                        "user_id":user.id,
                        "username": user.username,
                        "email": user.email,
                        "date_of_birth": user.date_of_birth,
                        "phone_no": user.phone_no,
                        "gender": user.gender,
                        "profileUrl": user.profile_url,
                        "status": user.status,
                        "verified": user.is_verified,
                        "bio": user.bio,
                        "gov_url":user.gov_url,
                        "gov_status":user.gov_status
                    }
                }, status=status.HTTP_200_OK)
            return Response({
                "success": False,
                "errors": serializer.errors,
                "message": "Validation failed"
            }, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({
                "success": False,
                "message": f"An error occurred while updating profile: {str(e)}"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            