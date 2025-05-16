from django.urls import path
from . views import *
urlpatterns = [
    path('token/', CoustomMobileTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CoustomMobileTokenRefreshView.as_view(), name='token_refresh'),
    path('rides/<int:user_id>', GetRide.as_view(), name='token_refresh'),
]
