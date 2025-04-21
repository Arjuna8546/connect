from django.urls import path
from .views import PostRide

urlpatterns = [
    path('add/',PostRide.as_view(),name="post_ride"),
    path('add/<int:user_id>',PostRide.as_view(),name="post_ride")
]
