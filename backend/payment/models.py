from django.db import models
from base.models import Users
from rides.models import BookRide

class Payment(models.Model):
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=10, default="inr")
    stripe_payment_id = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    book = models.ForeignKey(BookRide,on_delete=models.CASCADE,blank=True,null=True)
    success = models.BooleanField(default=False)