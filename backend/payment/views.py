import stripe
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework import status
from .models import Payment
from base.models import Users
from rides.serializer import BookRideSerializer
from rides.models import BookRide
from .serializer import PaymentSerializer
import os
from dotenv import load_dotenv

load_dotenv()

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

class CreatePaymentIntentView(APIView):
    def post(self, request):
        amount = request.data.get('amount')
        currency = request.data.get('currency')
        user_id = request.data.get('user_id')
        book_id = request.data.get('book_id')
        if not user_id:
            return Response({'error': 'Invalid user id'}, status=400)
        if not amount or int(amount) <= 0:
            return Response({'error': 'Invalid amount'}, status=400)
        if not currency:
            return Response({'error': 'Currency is required'}, status=400)
        
        supported_currencies = ['inr', 'usd', 'huf']
        if currency.lower() not in supported_currencies:
            return Response({'error': 'Unsupported currency'}, status=400)

        user = Users.objects.get(id=user_id)
        book = BookRide.objects.get(id=book_id)
        try:
            intent = stripe.PaymentIntent.create(
                amount=int(amount), 
                currency=currency,
            )
            # Save to the database
            payment_data = {
                'amount': amount,
                'currency': currency,
                'stripe_payment_id': intent['id'],
            }
            serializer = PaymentSerializer(data=payment_data)
            if serializer.is_valid():
                serializer.save(user=user,book=book)
                return Response({
                    'clientSecret': intent['client_secret'],
                    'payment': serializer.data,
                    
                }, status=status.HTTP_201_CREATED)
                
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except stripe.error.StripeError as e:
            return Response({'error': str(e)}, status=400)
        
        
class ConfirmPaymentView(APIView):
    def post(self, request):
        payment_intent_id = request.data.get('payment_intent_id')

        if not payment_intent_id:
            return Response({'error': 'PaymentIntent ID required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            payment = Payment.objects.get(stripe_payment_id=payment_intent_id)
        except Payment.DoesNotExist:
            return Response({'error': 'Payment not found'}, status=status.HTTP_404_NOT_FOUND)

        try:
            payment.success = True
            payment.save()

            if not hasattr(payment, 'book') or not payment.book:
                return Response({'error': 'No associated booking found for payment'}, status=status.HTTP_400_BAD_REQUEST)

            book = payment.book 
            book.payment_status = 'paid'
            book.save()
            data = {
                "from_loc_name":book.from_loc_name,
                "to_loc_name":book.to_loc_name,
                "price":book.price              
            }
            return Response({'message': 'Payment marked as paid',"data":data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)