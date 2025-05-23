from rest_framework import serializers
from .models import Payment
from base.models import WalletTransaction
from base.serializer import UserRegistrationSerializer
from rides.serializer import BookRideSerializer
    

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['id', 'amount', 'currency', 'stripe_payment_id', 'created_at', 'user','book','success']
        read_only_fields = ['user', 'created_at','book']
        
class WalletTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = WalletTransaction
        fields = '__all__'
        
class PaymentSerializer(serializers.ModelSerializer):
    user = UserRegistrationSerializer(read_only=True)   
    book = BookRideSerializer(read_only=True)  

    class Meta:
        model = Payment
        fields = [
            'id',
            'amount',
            'currency',
            'stripe_payment_id',
            'created_at',
            'success',
            'user',
            'book',
        ]