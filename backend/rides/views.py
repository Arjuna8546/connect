from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions

from base.models import Users
from .models import Ride,Seat
from django.contrib.gis.geos import Point
from django.contrib.gis.measure import D
from django.db.models import Q
from datetime import datetime, timedelta

from .serializer import RideSerializer


class PostRide(APIView):
    def post(self,request):
        serializer = RideSerializer(data=request.data)
        if serializer.is_valid():
            ride = serializer.save()
            return Response({"success": True,"message":"ride posted successfully", "data": serializer.data}, status=status.HTTP_201_CREATED)
        return Response({"success": False, "error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, user_id):
        try:
            user = Users.objects.get(id=user_id)
        except Users.DoesNotExist:
            return Response({"success": False, "message": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        rides = Ride.objects.filter(user=user).select_related('vehicle', 'user').prefetch_related('stopover_prices')

        ride_data = []

        for ride in rides:
            passengers_list = [
                {
                    "name": "Anjali R",
                    "gender": "Female",
                    "profileImage": "https://randomuser.me/api/portraits/women/44.jpg",
                    "from": "Manakkalappadi",
                    "to": "Vellangallur"
                },
                {
                    "name": "Rakesh P",
                    "gender": "Male",
                    "profileImage": "https://randomuser.me/api/portraits/men/32.jpg",
                    "from": "Ernakulam",
                    "to": "Thrissur"
                }
            ]

            formatted_date = ride.date.strftime("%A, %d %B")
            start_time = ride.time.strftime("%H : %M") if ride.time else "N/A"

            end_time = "20 : 20"

            ride_data.append({
                "startTime": start_time,
                "endTime": end_time,
                "from": ride.start_location_name.upper(),
                "to": ride.destination_location_name.upper(),
                "duration": ride.duration,
                "date": formatted_date,
                "status": "start",
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

class RideSearchView(APIView):
    def post(self, request):
        data = request.data

        start_point = data.get("start_point", {})
        end_point = data.get("end_point", {})
        date = data.get("date")
        passenger_count = data.get("passenger_count")

        if not (start_point and end_point and date and passenger_count):
            return Response({"error": "Missing required fields."}, status=status.HTTP_400_BAD_REQUEST)

        start_coords = start_point.get("coordinates")
        end_coords = end_point.get("coordinates")

        if not (start_coords and end_coords):
            return Response({"error": "Missing coordinates."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            start_point_geom = Point(start_coords[0], start_coords[1], srid=4326)
            end_point_geom = Point(end_coords[0], end_coords[1], srid=4326)
        except (TypeError, ValueError, IndexError):
            return Response({"error": "Invalid coordinates format."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            passenger_count = int(passenger_count)
        except (ValueError, TypeError):
            return Response({"error": "Passenger count must be a number."}, status=status.HTTP_400_BAD_REQUEST)

        rides = Ride.objects.filter(
            date=date,
            passenger_count__gte=passenger_count
        ).filter(
            (
                Q(start_location__distance_lte=(start_point_geom, D(km=5))) |
                Q(stopover_prices__stop_location__distance_lte=(start_point_geom, D(km=5)))
            ) &
            (
                Q(destination_location__distance_lte=(end_point_geom, D(km=5))) |
                Q(stopover_prices__stop_location__distance_lte=(end_point_geom, D(km=5)))
            )
        ).distinct()

        data = []
        for ride in rides:
            try:
                ride_datetime = datetime.combine(datetime.today(), ride.time)
                ride_duration = parse_duration(ride.duration)
                end_time = (ride_datetime + ride_duration).strftime("%H:%M")
            except:
                end_time = ""
            data.append({
                "id":ride.id,
                "startTime": ride.time.strftime("%H:%M"),
                "endTime": end_time, 
                "from": ride.start_location_name,
                "to": ride.destination_location_name,
                "duration": ride.duration,
                "driver": ride.user.username,
                "gender": getattr(ride.user, "gender", "Not specified"),
                "driverImage": getattr(ride.user, "profile_url", ""),
                "price": ride.price,
                "status": "Instant" if ride.instant_booking else "Requested",
                "stopovers": [
                    {
                        "stop": s.stop,
                        "price": s.price,
                        "duration": s.duration,
                        "distance": s.distance,
                    }
                    for s in ride.stopover_prices.all()
                ]
            })

        return Response({"success": True, "data": data}, status=status.HTTP_200_OK)
    

    def get(self,request,ride_id):
        try:
            ride = Ride.objects.get(id=ride_id)
        except Ride.DoesNotExist:
            return Response({"detail": "Ride not found."}, status=status.HTTP_404_NOT_FOUND)

        seat_queryset = Seat.objects.filter(ride=ride).order_by('seat_number')
        seat_map = {}

        for seat in seat_queryset:
            sn = seat.seat_number
            if sn not in seat_map:
                seat_map[sn] = {
                    "seat_number": sn,
                    "segments": []
                }
                
        
            segment = {
                "segment_id": seat.id,
                "from": seat.from_location,
                "to": seat.to_location,
                "from_short": seat.from_short,
                "to_short": seat.to_short,
                "status": seat.status,
                
            }
            seat_map[sn]["segments"].append(segment)

        return Response({"success":True,"data":list(seat_map.values())}, status=status.HTTP_200_OK)
    
    def patch(self,request):
        try:
            user_id = request.data.get("user_id")
            segment_ids = request.data.get("segment_ids", [])

            if not user_id or not segment_ids:
                return Response({
                    "success": False,
                    "message": "Missing user_id or segment_ids"
                }, status=status.HTTP_400_BAD_REQUEST)

            user = Users.objects.filter(id=user_id).first()
            if not user:
                return Response({
                    "success": False,
                    "message": "User not found"
                }, status=status.HTTP_404_NOT_FOUND)

            updated_count = Seat.objects.filter(id__in=segment_ids, status='vacant').update(
                status='booked',
                booked_by=user
            )

            return Response({
                "success": True,
                "message": f"{updated_count} segments booked successfully."
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({
                "success": False,
                "message": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)