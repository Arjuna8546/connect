from django.contrib.gis.db import models
from base.models import Users,Vehicles
from django.conf import settings
from datetime import time

class Ride(models.Model):
    RIDE_STATUS_CHOICE =[
        ("active", "Active"),
        ("pending","Pending"),
        ("cancelled", "Cancelled"),
        ("completed", "Completed"),
    ]
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
    price = models.PositiveIntegerField(default=0)

    passenger_count = models.PositiveIntegerField()

    instant_booking = models.BooleanField(default=False)
    additional_info = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    status = models.CharField(max_length=20,choices=RIDE_STATUS_CHOICE,default="active")
    
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
    duration = models.CharField(max_length=25,default="0 hr")
    distance = models.CharField(max_length=25,default="0 km")
    
    class Meta:
        ordering = ['position']
    
    def __str__(self):
        return f"{self.stop} = ₹{self.price}"
    
class BookRide(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    ride = models.ForeignKey("Ride", on_delete=models.CASCADE)

    price = models.DecimalField(max_digits=8, decimal_places=2)
    
    from_loc_name = models.CharField(max_length=255)
    to_loc_name = models.CharField(max_length=255)

    payment_status = models.CharField(max_length=20, choices=[
        ("pending", "Pending"),
        ("paid", "Paid"),
        ("failed", "Failed"),
    ], default="pending")
    pickup_time = models.TimeField(default=time(0, 0))
    booking_status = models.CharField(max_length=20, choices=[
        ("active", "Active"),
        ("pending","Pending"),
        ("cancelled", "Cancelled"),
        ("completed", "Completed"),
    ], default="active")

    booking_time = models.DateTimeField(auto_now_add=True)
    
    seat_segments = models.ManyToManyField("Seat", blank=True, related_name="held_by_bookings")

    def __str__(self):
        return f"Booking by {self.user.username} for Ride {self.ride.id}"

    
class Seat(models.Model):
    STATUS_CHOICE =[
        ("vacant","vacant"),
        ("booked","Booked"),
    ]
    
    ride = models.ForeignKey("Ride", related_name="seats", on_delete=models.CASCADE)
    seat_number = models.IntegerField()

    from_location = models.CharField(max_length=255)
    from_short = models.CharField(max_length=10)
    from_point = models.PointField(geography=True, spatial_index=True)

    to_location = models.CharField(max_length=255)
    to_short = models.CharField(max_length=10)
    to_point = models.PointField(geography=True, spatial_index=True)

    status = models.CharField(max_length=20,choices=STATUS_CHOICE,default="vacant")

    def __str__(self):
        return f"Seat {self.seat_number} - {self.from_short} to {self.to_short} (Ride {self.ride.id})"

    class Meta:
        verbose_name = "Seat Segment"
        verbose_name_plural = "Seat Segments"
        
class SeatRequest(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("approved", "Approved"),
        ("rejected", "Rejected"),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    ride = models.ForeignKey("Ride", on_delete=models.CASCADE)
    seat = models.ForeignKey("Seat", on_delete=models.CASCADE)

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    requested_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} requested Seat {self.seat.id} for Ride {self.ride.id} - {self.status}"
