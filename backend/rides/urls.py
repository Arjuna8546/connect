from django.urls import path
from .views import PostRide,RideSearchView,RideBook,ApproveRide,CancelRide,BookRideOtpVerify,RideFinish


urlpatterns = [
    path('add/',PostRide.as_view(),name="post_ride"),
    path('add/<int:user_id>/',PostRide.as_view(),name="get_ride"),
    path('add/delete/<int:ride_id>',PostRide.as_view(),name="delete_ride"),
    path('add/update/',PostRide.as_view(),name="update_ride"),
    path('search/',RideSearchView.as_view(),name="search"),
    path('seat/<int:ride_id>',RideSearchView.as_view(),name="search"),
    path('seat/update/',RideBook.as_view(),name="update_seat"),
    path('booked/<int:user_id>/',RideBook.as_view(),name="update_seat"),
    path('book/approve/<int:ride_id>',ApproveRide.as_view(),name="approve ride"),
    path('book/cancel/<int:book_id>',CancelRide.as_view(),name="cancel booke ride"),
    path('book/staus',ApproveRide.as_view(),name="approve pending or reject"),
    path('book/otpverify',BookRideOtpVerify.as_view(),name="verify booking"),
    path('finish/',RideFinish.as_view(),name="Ride finish"),
    
]
