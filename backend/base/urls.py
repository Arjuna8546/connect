
from django.urls import path
from base.views import CoustomTokenObtainPairView,CoustomTokenRefreshView,Register,VerifyOtp

urlpatterns = [

    path('token/', CoustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CoustomTokenRefreshView.as_view(), name='token_refresh'),
    path('register/',Register.as_view(),name="registration"),
    path('verifyotp/',VerifyOtp.as_view(),name="verify-otp"),

]