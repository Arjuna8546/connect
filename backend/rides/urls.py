from django.urls import path
from .views import PostRide,RideSearchView,RideBook,ApproveRide


urlpatterns = [
    path('add/',PostRide.as_view(),name="post_ride"),
    path('add/<int:user_id>',PostRide.as_view(),name="post_ride"),
    path('search/',RideSearchView.as_view(),name="search"),
    path('seat/<int:ride_id>',RideSearchView.as_view(),name="search"),
    path('seat/update/',RideBook.as_view(),name="update_seat"),
    path('booked/<int:user_id>/',RideBook.as_view(),name="update_seat"),
    path('book/approve/<int:ride_id>',ApproveRide.as_view(),name="approve ride"),
    path('book/staus',ApproveRide.as_view(),name="approve pending or reject")
    
]
