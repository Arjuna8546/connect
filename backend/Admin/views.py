from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework.views import APIView
from base.models import Users,Wallet
from payment.models import Payment
from rides.models import Ride,BookRide
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from .permissions import IsAdmin
from rest_framework import permissions
from base.serializer import CustomTokenObtainPairSerializer
from payment.serializer import PaymentSerializer

from rest_framework.pagination import PageNumberPagination
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.exceptions import AuthenticationFailed
from  base.serializer import CustomTokenObtainPairSerializer,UserRegistrationSerializer,AdminDashboardSerializer
from rides.serializer import RideSerializer,BookRideSerializer
from base.models import Users  
from .permissions import IsAdmin
from django.db.models import Q
from django.utils.timezone import now
from datetime import timedelta
from django.db.models import Count, Sum


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
                    "id": user.id,
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
        
class BlockUser(APIView):
    permission_classes= [IsAdmin]
    def patch(self, request):
        try:
            user = Users.objects.get(id=request.data["id"])
            serializer = UserRegistrationSerializer(user, data=request.data, partial=True)
            if serializer.is_valid():
                user = serializer.save()
                return Response({
                    "success": True,
                    "message": f"User {user.status} successfully",
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
            

class AllRides(APIView):
    permission_classes=[IsAdmin]
    def get(self,request):
        try: 
            stats = request.GET.get("status",'active')
            rides = Ride.objects.filter(status=stats).order_by('id')

            paginator = PageNumberPagination()
            paginator.page_size = 2
            result_page = paginator.paginate_queryset(rides, request)
            serializer = RideSerializer(result_page,many=True)
            return paginator.get_paginated_response({
                "success": True,
                "message": "All rides retrieved successfully",
                "rides": serializer.data
            })
        except Exception as e:
            return Response({"success":False,"message":f"An error occured: {str(e)}"},status=status.HTTP_400_BAD_REQUEST)
        
class AllBook(APIView):
    permission_classes=[IsAdmin]
    def get(self,request):
        try:
            stats = request.GET.get("status",'active')
            bookings = BookRide.objects.filter(booking_status=stats).order_by('-id')

            paginator = PageNumberPagination()
            paginator.page_size = 2
            result_page = paginator.paginate_queryset(bookings, request)
            serializer = BookRideSerializer(result_page,many=True)
            return paginator.get_paginated_response({
                "success": True,
                "message": "All rides retrieved successfully",
                "bookings": serializer.data
            })
        except Exception as e:
            return Response({"success":False,"message":f"An error occured: {str(e)}"},status=status.HTTP_400_BAD_REQUEST)
        
class Allpayments(APIView):
    permission_classes=[IsAdmin]
    def get(self,request):
        try:
            stats = request.GET.get("status",'succeeded')
            payment = Payment.objects.filter(success=stats).order_by('-id')
            paginator = PageNumberPagination()
            paginator.page_size = 2
            result_page = paginator.paginate_queryset(payment, request)
            serializer = PaymentSerializer(result_page,many=True)
            return paginator.get_paginated_response({
                "success": True,
                "message": "All payments retrieved successfully",
                "payments": serializer.data
            })
        except Exception as e:
            return Response({"success":False,"message":f"An error occured: {str(e)}"},status=status.HTTP_400_BAD_REQUEST)

class AdminDashboard(APIView):
    def get(self, request):
        try:
            range_value = int(request.GET.get("range", 7))
            admin = Users.objects.filter(role='admin').first()
            today = now().date()
            seven_days_ago = today - timedelta(days=6)

            total_users = Users.objects.filter(role='user').count()
            total_rides = Ride.objects.count()
            total_bookings = BookRide.objects.count()
            active_rides = Ride.objects.filter(status="active").count()
            today_rides = Ride.objects.filter(date=today).count()
            wallet = Wallet.objects.get(user=admin)
            earnings = wallet.balance

            rides_chart_data = []
            for i in range(range_value):
                day = today - timedelta(days=i)
                count = Ride.objects.filter(date=day).count()
                rides_chart_data.append({
                    "date": day.strftime('%Y-%m-%d'),
                    "rides": count
                })
            rides_chart_data.reverse()

            date_threshold = now() - timedelta(days=range_value)
            status_counts = BookRide.objects.filter(created_at__gte=date_threshold).values('booking_status').annotate(count=Count('id'))
            status_chart = [{"status": item['booking_status'], "count": item['count']} for item in status_counts]

            recent_bookings_qs = BookRide.objects.select_related('user', 'ride').order_by('-booking_time')[:5]
            recent_bookings = [{
                "id": b.id,
                "user": b.user.username,
                "user_profile": getattr(b.user, "profile_url", ""),
                "from": b.from_loc_name,
                "to": b.to_loc_name,
                "price": str(b.price),
                "ride_start": b.ride.start_location_name,
                "ride_end": b.ride.destination_location_name,
                "status": b.booking_status,
                "payment": b.payment_status,
                "booking_time": b.booking_time,
            } for b in recent_bookings_qs]

            active_rides_qs = Ride.objects.filter(status="active").select_related('user').order_by('-date')[:5]
            active_rides_data = [{
                "id": r.id,
                "driver": r.user.username,
                "driver_profile": getattr(r.user, "profile_url", ""),
                "start": r.start_location_name,
                "end": r.destination_location_name,
                "date": r.date,
                "time": r.time,
                "price": r.price,
                "status": r.status,
            } for r in active_rides_qs]

            serializer = AdminDashboardSerializer({
                "total_users": total_users,
                "total_rides": total_rides,
                "total_bookings": total_bookings,
                "active_rides": active_rides,
                "today_rides": today_rides,
                "earnings": earnings,
                "rides_chart": rides_chart_data,
                "status_chart": status_chart,
                "recent_bookings": recent_bookings,
                "active_rides_data": active_rides_data,
            })

            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"error": "Something went wrong while generating the admin dashboard.", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
