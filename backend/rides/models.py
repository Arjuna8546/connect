from django.contrib.gis.db import models
from base.models import Users,Vehicles

class Ride(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE, related_name="rides", db_index=True)
    vehicle = models.ForeignKey(Vehicles, on_delete=models.CASCADE, related_name="rides", db_index=True)
    
    start_location = models.PointField(geography=True, spatial_index=True)
    start_location_name = models.CharField(max_length=255)

    destination_location = models.PointField(geography=True, spatial_index=True)
    destination_location_name = models.CharField(max_length=255)
    
    pick_up_location = models.PointField(geography=True, spatial_index=True,null=True)
    drop_off_location = models.PointField(geography=True, spatial_index=True,null=True)

    date = models.DateField()
    time = models.TimeField()

    route = models.LineStringField(geography=True, spatial_index=True)
    route_distance = models.CharField(max_length=50)
    duration = models.CharField(max_length=25,default="0 hr")

    passenger_count = models.PositiveIntegerField()

    instant_booking = models.BooleanField(default=False)
    additional_info = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        indexes = [
            models.Index(fields=['user']),
            models.Index(fields=['date']),
            models.Index(fields=['vehicle']),
        ]

    def __str__(self):
        return f"{self.start_location_name} to {self.destination_location_name} on {self.date}"

class StopOvers(models.Model):
    ride = models.ForeignKey(Ride, on_delete=models.CASCADE, related_name="stopover_prices")
    stop = models.CharField(max_length=255)
    stop_location = models.PointField(geography=True, spatial_index=True)
    price = models.PositiveIntegerField()
    position = models.PositiveIntegerField()
    
    class Meta:
        ordering = ['position']
    
    def __str__(self):
        return f"{self.stop} = ₹{self.price}"