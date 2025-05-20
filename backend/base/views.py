from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework.views import APIView
from .models import Users,Vehicles,Wallet
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken
from .serializer import UserRegistrationSerializer,VehicleRegistrationSerializer,CustomTokenObtainPairSerializer
from rest_framework import permissions

from django.contrib.auth.hashers import make_password,check_password
from django.core.mail import send_mail
from django.conf import settings
from django.core.cache import cache
import random
import time
from django.db.models import Q

class CoustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
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
            res.data = {"success":True,"message":"user login successfully","userDetails":{"id":user.id,"username":user.username,"email":user.email,"date_of_birth":user.date_of_birth,"phone_no":user.phone_no,"gender":user.gender,"profileUrl":user.profile_url,"status":user.status,"verified":user.is_verified,"bio":user.bio,"gov_url":user.gov_url,"is_google":user.is_google,"gov_status":user.gov_status}}

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
                    {"success":False,"message":"refresh token expired or invalid" },
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
            user = serializer.save()
            Wallet.objects.create(user=user)
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
                        "id":user.id,
                        "username": user.username,
                        "email": user.email,
                        "date_of_birth": user.date_of_birth,
                        "phone_no": user.phone_no,
                        "gender": user.gender,
                        "profile_url": user.profile_url,
                        "status": user.status,
                        "is_verified": user.is_verified,
                        "bio": user.bio,
                        "is_google":user.is_google,
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
            

class AddVehicle(APIView):
    
    def get(self, request, user_id):    
        vehicles = Vehicles.objects.filter(user_id=user_id)
        serializer = VehicleRegistrationSerializer(vehicles, many=True)
        return Response({
            "success": True,
            "vehicles": serializer.data 
        }, status=status.HTTP_200_OK)       
    
    def post(self,request):
        serializer = VehicleRegistrationSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"success": True, "data": serializer.data}, status=status.HTTP_201_CREATED)
        return Response({"success": False, "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request):
        selected_id = request.data.get("vehicle_id")
        user = request.data.get("user_id")
        if not selected_id:
            return Response({
                "success": False,
                "message": "Vehicle ID is required"
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            vehicle = Vehicles.objects.get(id=selected_id, user=user)

            Vehicles.objects.filter(user=user).update(selected_vehicle=False)

            vehicle.selected_vehicle = True
            vehicle.save()
            
            all_vehicles = Vehicles.objects.filter(user=user)
            serializer = VehicleRegistrationSerializer(all_vehicles, many=True)
            return Response({
                "success": True,
                "vehicle": serializer.data
            }, status=status.HTTP_200_OK)

        except Vehicles.DoesNotExist:
            return Response({
                "success": False,
                "message": "Vehicle not found or does not belong to user"
            }, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({
                "success": False,
                "message": "An error occurred",
                "error": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GetUserVehicleDetail(APIView):
    def get(self, request, user_id):
        try:
            user = Users.objects.get(id=user_id)
        except Users.DoesNotExist:
            return Response({"success": False, "error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        try:
            vehicles = Vehicles.objects.filter(user_id=user_id)
        except Vehicles.DoesNotExist:
            vehicles = []

        user_serializer = UserRegistrationSerializer(user)
        vehicle_serializer = VehicleRegistrationSerializer(vehicles, many=True)

        return Response({
            "success": True,
            "user": user_serializer.data,
            "vehicles": vehicle_serializer.data
        }, status=status.HTTP_200_OK)
        
class ForgetPassWord(APIView):
    permission_classes=[]
    def post(self, request):
        email = request.data.get("email")

        if not email:
            return Response({"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = Users.objects.get(email=email)
        except Users.DoesNotExist:
            return Response({"error": "No user with this email"}, status=status.HTTP_404_NOT_FOUND)

        otp = generate_otp()
        store_otp_in_redis(email, otp)

        sent_otp_email(email, otp)

        return Response(
            {
                "success": True,
                "message": f"OTP sent to {email}. Verify to complete registration."
            },
            status=status.HTTP_201_CREATED
        )
        
class ForgetPasswordVerifyOtp(APIView):
    authentication_classes = []
    permission_classes = [permissions.AllowAny]
    def post(self,request):
        email = request.data.get("email")
        otp = request.data.get("otp")

        if not email or not otp:
            return Response(
                {"success": False, "message": "Email and OTP are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        stored_otp, expire_time = get_otp_from_redis(email)

        if stored_otp is None or expire_time < int(time.time()):
            return Response(
                {"success": False, "message": "OTP expired or invalid"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if str(stored_otp) != str(otp):
            return Response(
                {"success": False, "message": "Invalid OTP"},
                status=status.HTTP_400_BAD_REQUEST
            )

        delete_otp_from_redis(email)

        return Response(
            {"success": True, "message": "OTP verified. You may now reset your password."},
            status=status.HTTP_200_OK
        )
        

class ChangePassword(APIView):
    permission_classes=[]
    def post(self,request):
        email = request.data.get('email')
        new_password = request.data.get('password')
        
        if not email or not new_password:
            return Response({'success':False,'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = Users.objects.get(email=email)
            user.password = make_password(new_password) 
            user.save()
            return Response({'success':True,'message': 'Password updated successfully'}, status=status.HTTP_200_OK)
        except Users.DoesNotExist:
            return Response({'success':False,'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
class UserPasswordChange(APIView):
    def post(self,request):
        user_id = request.data.get("id")
        new_pass = request.data.get("newPassword")
        prev_pass = request.data.get("previousPassword")

        if not user_id or not prev_pass or not new_pass:
            return Response(
                {'success': False, 'error': 'User ID, old password, and new password are required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        try:
            user = Users.objects.get(id=user_id)
        except Users.DoesNotExist:
            return Response(
                {'success': False, 'error': 'User not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        if not check_password(prev_pass, user.password):
            return Response(
                {'success': False, 'error': 'Incorrect old password'},
                status=status.HTTP_400_BAD_REQUEST
            )
        user.password = make_password(new_pass)
        user.save()
        return Response({'success': True, 'message': 'Password updated successfully'}, status=status.HTTP_200_OK)
    
class GoogleAuthView(APIView):
    permission_classes=[]
    
    def post(self,request):
        email = request.data.get("email")
        username = request.data.get("username")
        phone_no = request.data.get("phone_no")
        profile_url = request.data.get("profile_url")
        date_of_birth = request.data.get("date_of_birth")
        
        if not email:
            return Response({"success": False, "message": "Email is required"}, status=400)
        
        existing_user = Users.objects.filter(phone_no=phone_no).exclude(email=email).first()
        if existing_user:
            return Response({
                "success": False,
                "message": "Phone number already in use by another user"
            }, status=400)
        
        user, created = Users.objects.get_or_create(email=email, defaults={
            "username": username,
            "phone_no": phone_no,
            "profile_url": profile_url,
            "date_of_birth": date_of_birth,
        })
        
        if created:
            user.set_unusable_password()
            user.is_google =True
            user.save()
            Wallet.objects.create(user=user)
                       
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)
        
        response = Response({
            "success": True,
            "message": "User login/signup successful",
            "userDetails": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "date_of_birth": user.date_of_birth,
                "phone_no": user.phone_no,
                "gender": user.gender,
                "profileUrl": user.profile_url,
                "status": user.status,
                "verified": user.is_verified,
                "bio": user.bio,
                "gov_url": user.gov_url,
                "is_google":user.is_google,
                "gov_status": user.gov_status
            }
        }, status=status.HTTP_200_OK)
        
        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,
            secure=True,
            samesite="None",
            path="/",
            max_age=3600
        )

        response.set_cookie(
            key="refresh_token",
            value=refresh_token,
            httponly=True,
            secure=True,
            samesite="None",
            path="/",
            max_age=3600
        )

        return response
    
class CheckGoogleUserExistsView(APIView):
    permission_classes = []

    def post(self, request):
        email = request.data.get("email")
        if not email:
            return Response({"success": False, "message": "Email is required"}, status=400)

        user_exists = Users.objects.filter(Q(email=email)& Q(is_google=True)).exists()

        return Response({
            "success": True,
            "user_exists": user_exists
        }, status=200)
