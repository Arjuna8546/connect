
from django.urls import path
from base.views import CoustomTokenObtainPairView,CoustomTokenRefreshView,Register,VerifyOtp,UpdateUser,Logout,AddVehicle

urlpatterns = [

    path('token/', CoustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CoustomTokenRefreshView.as_view(), name='token_refresh'),
    path('register/',Register.as_view(),name="registration"),
    path('verifyotp/',VerifyOtp.as_view(),name="verify-otp"),
    path('update/user/',UpdateUser.as_view(),name="update-user"),
    path('logout/',Logout.as_view(),name="logout"),
    path('register/vehicle',AddVehicle.as_view(),name="add-vehicle"),
    path('vehicles/<int:user_id>/', AddVehicle.as_view(), name='get_user_vehicles'),
    path('update/vehicle/',AddVehicle.as_view(), name='update_vehicles')

]