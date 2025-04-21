from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions

from base.models import Users
from .models import Ride

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
            # Dummy passenger list for now
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
