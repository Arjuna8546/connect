from django.urls import path

from .views import AdminTokenObtainPairView,AdminTokenRefreshView,Logout,AdminAllUser

urlpatterns = [
    path('token/', AdminTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', AdminTokenRefreshView.as_view(), name='token_refresh'),
    path('logout/',Logout.as_view(),name="logout"),
    path('allusers/',AdminAllUser.as_view(),name="get_all_user")
]
