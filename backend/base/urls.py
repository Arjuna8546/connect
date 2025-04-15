
from django.urls import path
from base.views import CoustomTokenObtainPairView,CoustomTokenRefreshView,Register,VerifyOtp,UpdateUser,Logout,AddVehicle,GetUserVehicleDetail,ForgetPassWord,ForgetPasswordVerifyOtp,ChangePassword,UserPasswordChange,GoogleAuthView,CheckGoogleUserExistsView

urlpatterns = [

    path('token/', CoustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CoustomTokenRefreshView.as_view(), name='token_refresh'),
    path('register/',Register.as_view(),name="registration"),
    path('verifyotp/',VerifyOtp.as_view(),name="verify-otp"),
    path('update/user/',UpdateUser.as_view(),name="update-user"),
    path('logout/',Logout.as_view(),name="logout"),
    path('register/vehicle',AddVehicle.as_view(),name="add-vehicle"),
    path('vehicles/<int:user_id>/', AddVehicle.as_view(), name='get_user_vehicles'),
    path('update/vehicle/',AddVehicle.as_view(), name='update_vehicles'),
    path('getuservehicle/<int:user_id>/',GetUserVehicleDetail.as_view(),name="get all user vehicles"),
    path('forgetpassword/',ForgetPassWord.as_view(),name="forget-password"),
    path('verifyforgetpasswordotp/',ForgetPasswordVerifyOtp.as_view(),name="forget-password-otp-verify"),
    path('changepassword/',ChangePassword.as_view(),name="change-password"),
    path('resetpassword/',UserPasswordChange.as_view(),name="resr`et-password"),
    path('google/',GoogleAuthView.as_view(),name="google-sig-in"),
    path('google/check/',CheckGoogleUserExistsView.as_view(),name="checkuserexixt"),
    
    
    
    
]