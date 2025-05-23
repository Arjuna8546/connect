from rest_framework_gis.serializers import GeoFeatureModelSerializer
from rest_framework import serializers
from.models import Ride,StopOvers,Seat,BookRide
from base.models import Users,Vehicles
from rest_framework_gis.fields import GeometryField
from base.serializer import UserRegistrationSerializer

class StopOversSerializer(GeoFeatureModelSerializer):
    stop_location = GeometryField()
    
    class Meta:
        model = StopOvers
        geo_field = 'stop_location'
        fields = ['stop', 'stop_location', 'price', 'position','duration','distance']

class BookedPassengerSerializer(serializers.ModelSerializer):
    user_details = UserRegistrationSerializer(source='user', read_only=True)

    class Meta:
        model = BookRide
        fields = ['id', 'user', 'user_details', 'from_loc_name', 'to_loc_name', 'seat_segments', 'booking_status']

class RideSerializer(GeoFeatureModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset = Users.objects.all())
    user_details = UserRegistrationSerializer(source='user', read_only=True)
    vehicle = serializers.PrimaryKeyRelatedField(queryset = Vehicles.objects.all())
    start_location = GeometryField()
    destination_location = GeometryField()
    pick_up_location = GeometryField(required=False, allow_null=True)
    drop_off_location = GeometryField(required=False, allow_null=True)
    route = GeometryField()
    passengers = serializers.SerializerMethodField()
    
    stopovers = StopOversSerializer(source='stopover_prices', many=True, required=False)

    class Meta:
        model = Ride
        geo_field = "route"
        fields = [
            'id', 'user','user_details', 'vehicle', 'start_location', 'start_location_name',
            'destination_location', 'destination_location_name', 'pick_up_location',
            'drop_off_location', 'date', 'time', 'route', 'route_distance','duration', 'passenger_count',
            'instant_booking', 'additional_info', 'created_at', 'updated_at','stopovers','price','status','passengers'
        ]
        
    def get_passengers(self, ride):
        bookings = BookRide.objects.filter(ride=ride)
        return BookedPassengerSerializer(bookings, many=True).data
    
    def generate_short(self, name):
        if not name:
            return ""
        first_word = name.split(',')[0].strip()
        words = first_word.split()
        if len(words) == 1:
            return words[0][:3].upper()
        return ''.join(word[0] for word in words[:3]).upper()
    
    def create(self, validated_data):
        stopovers_data = validated_data.pop('stopover_prices', [])
        ride = Ride.objects.create(**validated_data)

        stop_points = [{
            "name": ride.start_location_name,
            "point": ride.start_location,
            "short": self.generate_short(ride.start_location_name),
        }]
        
        for stopover_data in stopovers_data:
            StopOvers.objects.create(ride=ride, **stopover_data)
            stop_points.append({
                "name": stopover_data['stop'],
                "point": stopover_data['stop_location'],
                "short": self.generate_short(stopover_data['stop']),
            })

        stop_points.append({
            "name": ride.destination_location_name,
            "point": ride.destination_location,
            "short": self.generate_short(ride.destination_location_name),
        })

        for seat_number in range(1, ride.passenger_count + 1):
            for i in range(len(stop_points) - 1):
                Seat.objects.create(
                    ride=ride,
                    seat_number=seat_number,
                    from_location=stop_points[i]["name"],
                    from_short=stop_points[i]["short"],
                    from_point=stop_points[i]["point"],
                    to_location=stop_points[i + 1]["name"],
                    to_short=stop_points[i + 1]["short"],
                    to_point=stop_points[i + 1]["point"],
                    status="vacant",
                    
                )

        return ride
    


class SeatSegmentSerializer(serializers.ModelSerializer):
    from_point = GeometryField()
    to_point = GeometryField()

    class Meta:
        model = Seat
        fields = [
            "id", "seat_number", "from_location", "from_short", "from_point",
            "to_location", "to_short", "to_point", "status"
        ]

class RideMiniSerializer(GeoFeatureModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    user_details = UserRegistrationSerializer(source="user", read_only=True)
    start_location = GeometryField()
    destination_location = GeometryField()
    pick_up_location = GeometryField(required=False, allow_null=True)
    drop_off_location = GeometryField(required=False, allow_null=True)
    route = GeometryField()
    stopovers = StopOversSerializer(source='stopover_prices', many=True)

    class Meta:
        model = Ride
        geo_field = "route"
        fields = [
            'id', 'user', 'user_details', 'vehicle', 'start_location', 'start_location_name',
            'destination_location', 'destination_location_name', 'pick_up_location',
            'drop_off_location', 'date', 'time', 'route', 'route_distance', 'duration',
            'passenger_count', 'instant_booking', 'additional_info', 'created_at',
            'updated_at', 'stopovers', 'price'
        ]

class BookRideSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    user_details = UserRegistrationSerializer(source="user", read_only=True)
    ride = serializers.PrimaryKeyRelatedField(queryset=Ride.objects.all())
    ride_details = RideMiniSerializer(source="ride", read_only=True)
    seat_segments = SeatSegmentSerializer(many=True, read_only=True)

    class Meta:
        model = BookRide
        fields = [
            "id", "user", "user_details", "ride", "ride_details",
            "price", "from_loc_name", "to_loc_name", "payment_status",
            "booking_status", "booking_time", "seat_segments"
        ]
