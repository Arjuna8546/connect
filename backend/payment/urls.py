from django.urls import path
from .views import CreatePaymentIntentView,ConfirmPaymentView,WalletDetails

urlpatterns = [
    path('create-payment-intent/', CreatePaymentIntentView.as_view(), name='create-payment-intent'),  
    path('confirm/', ConfirmPaymentView.as_view(), name='confirm-payment'), 
    path('wallet/<int:user_id>/',WalletDetails.as_view(),name="wallet detail"),
]