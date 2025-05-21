import stripe
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

from rest_framework import status
from .models import Payment
from base.models import Users,WalletTransaction,Wallet
from django.db import transaction
from rides.models import BookRide
from .serializer import PaymentSerializer,WalletTransactionSerializer
from django.shortcuts import get_object_or_404
import os
import random
from dotenv import load_dotenv
from decimal import Decimal, ROUND_DOWN
from django.core.mail import send_mail
from django.conf import settings

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

def generate_otp():
    return str(random.randint(10000, 99999))    

def sent_otp_email(email,otp):
    subject = "Your OTP Code"
    message = f"Hello,\n\n Your OTP for Ride Verification is :{otp}.\n\nUse this to complete your Ride. While you joing the ride"
    send_mail(subject, message, settings.EMAIL_HOST_USER, [email], fail_silently=False)  
        
class ConfirmPaymentView(APIView):
    def post(self, request):
        payment_intent_id = request.data.get('payment_intent_id')

        if not payment_intent_id:
            return Response(
                {'error': 'PaymentIntent ID required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        payment = get_object_or_404(Payment, stripe_payment_id=payment_intent_id)

        try:
            with transaction.atomic():
                payment.success = True
                payment.save()

                if not hasattr(payment, 'book') or not payment.book:
                    return Response(
                        {'error': 'No associated booking found for payment'},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                otp = generate_otp()
                
                book = payment.book
                
                book.book_otp = otp
                book.payment_status = 'paid'
                book.save()

                price = book.price
                commission = (price * Decimal("0.05")).quantize(Decimal("0.01"), rounding=ROUND_DOWN)
                balance_price = (price - commission).quantize(Decimal("0.01"), rounding=ROUND_DOWN)

                rider_wallet = book.ride.user.wallet
                WalletTransaction.objects.create(
                    wallet=rider_wallet,
                    transaction_type='credit',
                    amount=balance_price,
                    description=(
                        f'Amount ₹{balance_price} credited by '
                        f'{book.user.username} for ride from '
                        f'{book.from_loc_name} to {book.to_loc_name}'
                    )
                )

                admin_user = Users.objects.filter(role="admin").first()
                if admin_user and hasattr(admin_user, 'wallet'):
                    WalletTransaction.objects.create(
                        wallet=admin_user.wallet,
                        transaction_type='credit',
                        amount=commission,
                        description=(
                            f'Amount ₹{commission} credited for ride id '
                            f'{book.ride.id} commission'
                        )
                    )
                sent_otp_email(book.user.email,otp)

            data = {
                "from_loc_name": book.from_loc_name,
                "to_loc_name": book.to_loc_name,
                "price": price
            }

            return Response(
                {'message': 'Payment marked as paid', 'data': data},
                status=status.HTTP_200_OK
            )

        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
            
class WalletDetails(APIView):
    def get(self, request, user_id):
        if not user_id:
            return Response({"success": False, "error": "User ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            wallet = Wallet.objects.get(user=user_id)
        except Wallet.DoesNotExist:
            return Response({"success": False, "error": "Wallet not found"}, status=status.HTTP_404_NOT_FOUND)

        transactions = WalletTransaction.objects.filter(wallet=wallet).order_by('-timestamp')

        paginator = PageNumberPagination()
        paginator.page_size = 5 
        result_page = paginator.paginate_queryset(transactions, request)

        serializer = WalletTransactionSerializer(result_page, many=True)

        return paginator.get_paginated_response({
            "success": True,
            "user_mobile": wallet.user.phone_no,
            "balance": wallet.balance,
            "transaction": serializer.data
        })
        
        
         