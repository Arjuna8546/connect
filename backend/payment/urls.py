from django.urls import path
from .views import CreatePaymentIntentView,ConfirmPaymentView,WalletDetails,Allpayments,WalletPayment

urlpatterns = [
    path('create-payment-intent/', CreatePaymentIntentView.as_view(), name='create-payment-intent'),  
    path('confirm/', ConfirmPaymentView.as_view(), name='confirm-payment'), 
    path('wallet/<int:user_id>/',WalletDetails.as_view(),name="wallet detail"),
    path('paywallet/',WalletPayment.as_view(),name="wallet payment"),
    path('transactions/<int:user_id>/', Allpayments.as_view(), name='all user payments'),
]