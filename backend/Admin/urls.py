from django.urls import path

from .views import AdminTokenObtainPairView,AdminTokenRefreshView,Logout,AdminAllUser,VerifyUsers,BlockUser

urlpatterns = [
    path('token/', AdminTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', AdminTokenRefreshView.as_view(), name='token_refresh'),
    path('logout/',Logout.as_view(),name="logout"),
    path('allusers/',AdminAllUser.as_view(),name="get_all_user"),
    path('verifyusers/',VerifyUsers.as_view(),name="get_all_verify_user"),
    path('blockuser/',BlockUser.as_view(),name="block user")
    
]
