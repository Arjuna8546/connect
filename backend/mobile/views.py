from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework.views import APIView
from base.serializer import CustomTokenObtainPairSerializer
from rest_framework import permissions
from base.models import Users
from rides.models import BookRide,Ride
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from datetime import datetime, timedelta
from django.db.models import Q

# Create your views here.
class CoustomMobileTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        try:
            email = request.data.get("email")
            password = request.data.get("password")

            if not Users.objects.filter(email=email).exists():
                return Response(
                    {"success": False, "message": "User with this account does not exist"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            response = super().post(request, *args, **kwargs)
            token = response.data

            access_token = token["access"]
            refresh_token = token["refresh"]

            user = Users.objects.get(email=email)

            return Response({
                "success": True,
                "message": "User logged in successfully",
                "access": access_token,
                "refresh": refresh_token,
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
                    "is_google": user.is_google,
                    "gov_status": user.gov_status
                }
            }, status=status.HTTP_200_OK)

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


class CoustomMobileTokenRefreshView(TokenRefreshView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.data.get("refresh") 

            if not refresh_token:
                return Response(
                    {"success": False, "message": "Refresh token not found"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            request.data["refresh"] = refresh_token
            response = super().post(request, *args, **kwargs)

            if "access" not in response.data:
                return Response(
                    {"success": False, "message": "Refresh token expired or invalid"},
                    status=status.HTTP_401_UNAUTHORIZED
                )

            return Response({
                "success": True,
                "message": "Access token refreshed",
                "access": response.data["access"]
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"success": False, "message": f"An error occurred: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST
            )

class GetRide(APIView):
    permission_classes=[]
    def get(self, request, user_id):
        try:

            stats = request.GET.get('status', 'active')
            date = request.GET.get('date',datetime.now().date())

            user = Users.objects.get(id=user_id)
        except Users.DoesNotExist:
            return Response({"success": False, "message": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        rides = Ride.objects.filter(user=user,status=stats,date=date).select_related('vehicle', 'user').prefetch_related('stopover_prices')

        ride_data = []

        for ride in rides:
            passengers_list = []

            bookings = BookRide.objects.filter(Q(ride=ride)&Q(booking_status="active")).distinct()

            for booking in bookings:
                user = booking.user
                segments = booking.seat_segments.all().order_by('id')

                if segments.exists():
                    from_location = segments.first().from_location
                    to_location = segments.last().to_location

                    passengers_list.append({
                        "name": user.username,
                        "gender": user.gender,
                        "profileImage": user.profile_url if user.profile_url else None,
                        "from": from_location,
                        "to": to_location
                    })

            formatted_date = ride.date.strftime("%A, %d %B")
            start_time = ride.time.strftime("%H : %M") if ride.time else "N/A"
            try:
                ride_datetime = datetime.combine(datetime.today(), ride.time)
                ride_duration = parse_duration(ride.duration)
                end_time = (ride_datetime + ride_duration).strftime("%H:%M")
            except:
                end_time = ""

            ride_data.append({
                "id":ride.id,
                "startTime": start_time,
                "endTime": end_time,
                "from": ride.start_location_name.upper(),
                "to": ride.destination_location_name.upper(),
                "duration": ride.duration,
                "formatted_date": formatted_date,
                "date":ride.date,
                "status": ride.status,
                "passengers": ride.passenger_count,
                "vehicle": {
                    "type": ride.vehicle.vehicle_type,
                    "model": ride.vehicle.vehicle_model,
                    "number": ride.vehicle.vehicle_register_no
                },
                "routeName": "NH544",  
                "distance": ride.route_distance,
                "pickupLocation": ride.start_location_name,
                "dropoffLocation": ride.destination_location_name,
                "additionalInfo": ride.additional_info,
                "instantBooking":ride.instant_booking,
                "stopovers": [
                    {
                        "stop": stop.stop,
                        "stop_location": {
                            "type": "Point",
                            "coordinates": [stop.stop_location.x, stop.stop_location.y]
                        },
                        "price": stop.price,
                        "position": stop.position
                    }
                    for stop in ride.stopover_prices.all()
                ],
                "passengersList": passengers_list 
            })
        return Response({
            "success": True,
            "rides": ride_data
        }, status=status.HTTP_200_OK)
    
def parse_duration(duration_str):
    hours = 0
    minutes = 0
    duration_str = duration_str.lower().strip()
    if 'hr' in duration_str:
        parts = duration_str.split('hr')
        hours = int(parts[0].strip())
        if 'min' in parts[1]:
            minutes = int(parts[1].replace('min', '').strip())
    elif 'min' in duration_str:
        minutes = int(duration_str.replace('min', '').strip())

    return timedelta(hours=hours, minutes=minutes)