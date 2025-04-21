from rest_framework_gis.serializers import GeoFeatureModelSerializer
from rest_framework import serializers
from.models import Ride,StopOvers
from base.models import Users,Vehicles
from rest_framework_gis.fields import GeometryField

class StopOversSerializer(GeoFeatureModelSerializer):
    stop_location = GeometryField()
    
    class Meta:
        model = StopOvers
        geo_field = 'stop_location'
        fields = ['stop', 'stop_location', 'price', 'position']

class RideSerializer(GeoFeatureModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset = Users.objects.all())
    vehicle = serializers.PrimaryKeyRelatedField(queryset = Vehicles.objects.all())
    start_location = GeometryField()
    destination_location = GeometryField()
    pick_up_location = GeometryField(required=False, allow_null=True)
    drop_off_location = GeometryField(required=False, allow_null=True)
    route = GeometryField()
    
    stopovers = StopOversSerializer(source='stopover_prices', many=True, required=False)

    class Meta:
        model = Ride
        geo_field = "route"
        fields = [
            'id', 'user', 'vehicle', 'start_location', 'start_location_name',
            'destination_location', 'destination_location_name', 'pick_up_location',
            'drop_off_location', 'date', 'time', 'route', 'route_distance','duration', 'passenger_count',
            'instant_booking', 'additional_info', 'created_at', 'updated_at','stopovers'
        ]
    def create(self, validated_data):
        stopovers_data = validated_data.pop('stopover_prices', [])

        ride = Ride.objects.create(**validated_data)

        for stopover_data in stopovers_data:
            StopOvers.objects.create(ride=ride, **stopover_data)

        return ride
