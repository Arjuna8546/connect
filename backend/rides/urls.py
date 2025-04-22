from django.urls import path
from .views import PostRide,RideSearchView

urlpatterns = [
    path('add/',PostRide.as_view(),name="post_ride"),
    path('add/<int:user_id>',PostRide.as_view(),name="post_ride"),
    path('search/',RideSearchView.as_view(),name="search"),
    path('seat/<int:ride_id>',RideSearchView.as_view(),name="search"),
    path('seat/update/',RideSearchView.as_view(),name="update_seat")
]
