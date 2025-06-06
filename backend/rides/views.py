from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions

from base.models import Users,Wallet,WalletTransaction
from .models import Ride,Seat,BookRide,StopOvers,SeatRequest
from chatapp.models import Conversation,Message,Notification
from django.contrib.gis.geos import Point
from django.contrib.gis.measure import D
from django.contrib.gis.db.models.functions import Distance
from django.db.models import Q
from datetime import datetime, timedelta
from django.db import transaction
from django.shortcuts import get_object_or_404
from collections import defaultdict

from .serializer import RideSerializer

from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
import json
from django.utils import timezone
from django.core.cache import cache
from django.core.mail import send_mail
from django.conf import settings
from decimal import Decimal, ROUND_DOWN


class PostRide(APIView):
    def post(self,request):
        serializer = RideSerializer(data=request.data)
        if serializer.is_valid():
            ride = serializer.save()
            return Response({"success": True,"message":"ride posted successfully", "data": serializer.data}, status=status.HTTP_201_CREATED)
        return Response({"success": False, "error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, user_id):
        try:

            stats = request.GET.get('status', 'active')
            date = request.GET.get('date',datetime.now().date())

            user = Users.objects.get(id=user_id)
        except Users.DoesNotExist:
            return Response({"success": False, "message": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        rides = Ride.objects.filter(user=user,status=stats,date=date).select_related('vehicle', 'user').prefetch_related('stopover_prices')

        ride_data = []

        for ride in rides:
            passengers_list = []

            bookings = BookRide.objects.filter(Q(ride=ride)&Q(booking_status="active")).distinct()

            for booking in bookings:
                user = booking.user
                segments = booking.seat_segments.all().order_by('id')

                if segments.exists():
                    from_location = segments.first().from_location
                    to_location = segments.last().to_location

                    passengers_list.append({
                        "booking_id":booking.id,
                        "payment_status":booking.payment_status,
                        "verified_otp":booking.verified_otp,
                        "name": user.username,
                        "email":user.email,
                        "gender": user.gender,
                        "profileImage": user.profile_url if user.profile_url else None,
                        "from": from_location,
                        "to": to_location
                    })

            formatted_date = ride.date.strftime("%A, %d %B")
            start_time = ride.time.strftime("%H : %M") if ride.time else "N/A"
            try:
                ride_datetime = datetime.combine(datetime.today(), ride.time)
                ride_duration = parse_duration(ride.duration)
                end_time = (ride_datetime + ride_duration).strftime("%H:%M")
            except:
                end_time = ""

            ride_data.append({
                "id":ride.id,
                "startTime": start_time,
                "endTime": end_time,
                "from": ride.start_location_name.upper(),
                "to": ride.destination_location_name.upper(),
                "duration": ride.duration,
                "formatted_date": formatted_date,
                "date":ride.date,
                "status": ride.status,
                "passengers": ride.passenger_count,
                "vehicle": {
                    "type": ride.vehicle.vehicle_type,
                    "model": ride.vehicle.vehicle_model,
                    "number": ride.vehicle.vehicle_register_no
                },
                "routeName": "NH544",  
                "distance": ride.route_distance,
                "pickupLocation": ride.start_location_name,
                "dropoffLocation": ride.destination_location_name,
                "additionalInfo": ride.additional_info,
                "instantBooking":ride.instant_booking,
                "is_tracking":ride.is_tracking,
                "stopovers": [
                    {
                        "stop": stop.stop,
                        "stop_location": {
                            "type": "Point",
                            "coordinates": [stop.stop_location.x, stop.stop_location.y]
                        },
                        "price": stop.price,
                        "position": stop.position
                    }
                    for stop in ride.stopover_prices.all()
                ],
                "passengersList": passengers_list 
            })
        return Response({
            "success": True,
            "rides": ride_data
        }, status=status.HTTP_200_OK)
        
    def delete(self, request, ride_id):
        try:
            ride = Ride.objects.get(id=ride_id)
        except Ride.DoesNotExist:
            return Response({"error": "Ride not found."}, status=status.HTTP_404_NOT_FOUND)

        if request.user != ride.user and not request.user.role=="admin":
            return Response({"error": "Permission denied."}, status=status.HTTP_403_FORBIDDEN)

        ride.delete()
        return Response({"success": True, "message": "Ride deleted successfully."}, status=status.HTTP_200_OK)

    def patch(self, request):
        ride_id = request.data.get("ride_id")
        reason = request.data.get("reason")

        if not (ride_id and reason):
            return Response({"error": "Missing required fields."}, status=status.HTTP_400_BAD_REQUEST)

        book_rides = BookRide.objects.filter(Q(ride__id=ride_id) & Q(booking_status="active"))
        user_messages = defaultdict(list)

        Ride.objects.filter(id=ride_id).update(status="cancelled")

        try:
            with transaction.atomic():
                for booking in book_rides:
                    booking.booking_status="cancelled"
                    booking.save()
                    if booking.payment_status == "paid":
                        user_wallet = Wallet.objects.select_for_update().get(user=booking.user)
                        rider_wallet = Wallet.objects.select_for_update().get(user=booking.ride.user)

                        price = booking.price
                        commission = (price * Decimal("0.05")).quantize(Decimal("0.01"), rounding=ROUND_DOWN)
                        refund_amount = (price - commission).quantize(Decimal("0.01"), rounding=ROUND_DOWN)

                        WalletTransaction(
                            wallet=user_wallet,
                            transaction_type='credit',
                            amount=refund_amount,
                            description=f"₹{refund_amount} refunded for cancelled ride. ₹{commission} retained as booking fee."
                        ).save()

                        WalletTransaction(
                            wallet=rider_wallet,
                            transaction_type='debit',
                            amount=refund_amount,
                            description=(
                                f"₹{refund_amount} debited due to ride cancellation "
                                f"of trip from {booking.from_loc_name} to {booking.to_loc_name}."
                            )
                        ).save()
        except Exception as e:
            return Response({"success": False, "error": f"Refund failed: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        for booking in book_rides:
            user = booking.user
            message = f"{booking.from_loc_name} to {booking.to_loc_name}"
            user_messages[user].append(message)

        # for user, messages in user_messages.items():
        #     ride_list = "\n".join([f"- {msg}" for msg in messages])
        #     subject = "Apology: Your Booked Ride(s) Have Been Cancelled"
        #     message = (
        #         f"Dear {user.username},\n\n"
        #         f"The following ride(s) you booked have been cancelled:\n\n"
        #         f"{ride_list}\n\n"
        #         f"Reason: {reason}.\n\n"
        #         f"We apologize for the inconvenience.\n\n"
        #         f"Best regards,\nThe RideShare Team"
        #     )
        #     try:
        #         send_mail(subject, message, settings.EMAIL_HOST_USER, [user.email], fail_silently=False)
        #     except Exception as e:
        #         pass  # Email failure won't stop the refund

        return Response({"success": True, "message": "Ride cancelled and refunds processed."}, status=status.HTTP_200_OK)


def parse_duration(duration_str):
    hours = 0
    minutes = 0
    duration_str = duration_str.lower().strip()
    if 'hr' in duration_str:
        parts = duration_str.split('hr')
        hours = int(parts[0].strip())
        if 'min' in parts[1]:
            minutes = int(parts[1].replace('min', '').strip())
    elif 'min' in duration_str:
        minutes = int(duration_str.replace('min', '').strip())

    return timedelta(hours=hours, minutes=minutes)

class RideSearchView(APIView):
    def post(self, request):
        data = request.data

        start_point = data.get("start_point", {})
        end_point = data.get("end_point", {})
        date = data.get("date")
        passenger_count = data.get("passenger_count")
        
        gender = request.GET.get("gender")
        min_price = request.GET.get("minPrice")
        max_price = request.GET.get("maxPrice")
        instant_booking = request.GET.get("instantBooking")
        
        if date<str(datetime.now().date()):
            return Response({"error": "Cannot search previous rides."}, status=status.HTTP_400_BAD_REQUEST)

        if not (start_point and end_point and date and passenger_count):
            return Response({"error": "Missing required fields."}, status=status.HTTP_400_BAD_REQUEST)

        start_coords = start_point.get("coordinates")
        end_coords = end_point.get("coordinates")

        if not (start_coords and end_coords):
            return Response({"error": "Missing coordinates."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            start_point_geom = Point(start_coords[0], start_coords[1], srid=4326)
            end_point_geom = Point(end_coords[0], end_coords[1], srid=4326)
        except (TypeError, ValueError, IndexError):
            return Response({"error": "Invalid coordinates format."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            passenger_count = int(passenger_count)
        except (ValueError, TypeError):
            return Response({"error": "Passenger count must be a number."}, status=status.HTTP_400_BAD_REQUEST)

        filters = Q(date=date) & Q(passenger_count__gte=passenger_count) &Q(status='active')
        if gender:
            filters &= Q(user_id__gender=gender)
        if min_price:
            filters &= Q(price__gte=min_price)
        if max_price:
            filters &= Q(price__lte=max_price)
        if instant_booking == "true":
            filters &= Q(instant_booking=True)

        start_buffer = start_point_geom.buffer(0.05)
        end_buffer = end_point_geom.buffer(0.05)

        rides = Ride.objects.filter(filters).filter(
            Q(start_location__within=start_buffer) |
            Q(destination_location__within=end_buffer) |
            Q(stopover_prices__stop_location__within=start_buffer) |
            Q(stopover_prices__stop_location__within=end_buffer)
        ).select_related("user").prefetch_related("stopover_prices").distinct()       
        
        rides = rides.filter(
            (
                Q(start_location__distance_lte=(start_point_geom, D(km=5))) |
                Q(stopover_prices__stop_location__distance_lte=(start_point_geom, D(km=5)))
            ) &
            (
                Q(destination_location__distance_lte=(end_point_geom, D(km=5))) |
                Q(stopover_prices__stop_location__distance_lte=(end_point_geom, D(km=5)))
            )
        ).distinct()

        data = []
        for ride in rides:
            try:
                ride_datetime = datetime.combine(datetime.today(), ride.time)
                ride_duration = parse_duration(ride.duration)
                end_time = (ride_datetime + ride_duration).strftime("%H:%M")
            except:
                end_time = ""
            data.append({
                "id":ride.id,
                "startTime": ride.time.strftime("%H:%M"),
                "endTime": end_time, 
                "from": ride.start_location_name,
                "to": ride.destination_location_name,
                "duration": ride.duration,
                "driver": ride.user.username,
                "gender": getattr(ride.user, "gender", "Not specified"),
                "driverImage": getattr(ride.user, "profile_url", ""),
                "driverVerified":ride.user.is_verified,
                "price": ride.price,
                "status": "Instant" if ride.instant_booking else "Requested",
                "stopovers": [
                    {
                        "stop": s.stop,
                        "price": s.price,
                        "duration": s.duration,
                        "distance": s.distance,
                    }
                    for s in ride.stopover_prices.all()
                ]
            })

        return Response({"success": True, "data": data}, status=status.HTTP_200_OK)
    

    def get(self,request,ride_id):
        try:
            ride = Ride.objects.get(id=ride_id)
        except Ride.DoesNotExist:
            return Response({"detail": "Ride not found."}, status=status.HTTP_404_NOT_FOUND)

        seat_queryset = Seat.objects.filter(ride=ride).order_by("seat_number")
        seat_map = defaultdict(lambda: {"seat_number": None, "segments": []})

        for seat in seat_queryset:
            sn = seat.seat_number
            if sn not in seat_map:
                seat_map[sn] = {
                    "seat_number": sn,
                    "segments": []
                }
                
            seat_request = seat.seatrequest_set.filter(status__in=["approved"]).first()
            booked_by_username = seat_request.user.username if seat_request else None
            
            segment = {
                "segment_id": seat.id,
                "from": seat.from_location,
                "to": seat.to_location,
                "from_short": seat.from_short,
                "to_short": seat.to_short,
                "status": seat.status,
                "booked_by": {
                    "username": booked_by_username,
                }if booked_by_username else None

            }
            seat_map[sn]["segments"].append(segment)

        return Response({"success":True,"data":list(seat_map.values())}, status=status.HTTP_200_OK)
    
class RideBook(APIView):
    def patch(self, request):
        try:
            user_id = request.data.get("user_id")
            segment_ids = request.data.get("segment_ids") 

            if not user_id or not segment_ids:
                return Response({
                    "success": False,
                    "message": "Missing user_id or segment_ids"
                }, status=status.HTTP_400_BAD_REQUEST)

            user = Users.objects.filter(id=user_id).first()
            if not user:
                return Response({
                    "success": False,
                    "message": "User not found"
                }, status=status.HTTP_404_NOT_FOUND)

            segment_ids = list(map(int, segment_ids))  
            
            existing_bookings = BookRide.objects.filter(
                user=user,
                seat_segments__in=segment_ids,
                booking_status__in=["pending", "active"]
            ).distinct()

            if existing_bookings.exists():
                return Response({
                    "success": False,
                    "message": "You have already requested or booked some of these segments."
                }, status=status.HTTP_400_BAD_REQUEST)
                
            seats = Seat.objects.select_related("ride").filter(id__in=segment_ids, status="vacant")

            if seats.count() != len(segment_ids):
                return Response({
                    "success": False,
                    "message": "Some segments are already booked or invalid."
                }, status=status.HTTP_400_BAD_REQUEST)

            ride = seats.first().ride
            
            if ride.user.id==user_id:
                return Response({
                    "success": False,
                    "message": "rider cannot book the ride."
                }, status=status.HTTP_400_BAD_REQUEST)

            seats = Seat.objects.filter(id__in=segment_ids).order_by("id")
            from_loc_name = seats.first().from_location
            to_loc_name = seats.last().to_location
            
            ride = seats.first().ride
            
            stopovers = list(ride.stopover_prices.all().order_by("position"))
            stop_map = {s.stop: s.price for s in stopovers}

            if from_loc_name == ride.start_location_name:
                if to_loc_name in stop_map:
                    segment_price = stop_map[to_loc_name]
                elif to_loc_name == ride.destination_location_name:
                    segment_price = ride.price
                else:
                    raise ValueError("Invalid 'to' location.")

            elif to_loc_name == ride.destination_location_name:
                if from_loc_name in stop_map:
                    segment_price = ride.price - stop_map[from_loc_name]
                else:
                    raise ValueError("Invalid 'from' location.")

            elif from_loc_name in stop_map and to_loc_name in stop_map:
                segment_price = stop_map[to_loc_name] - stop_map[from_loc_name]

            else:
                raise ValueError("Invalid stop combination.")
            
            stop = StopOvers.objects.filter(stop=from_loc_name).first()
            if stop:
                parse_time=parse_duration(stop.duration)
                ride_datetime = datetime.combine(datetime.today(), ride.time)  
                final_datetime = ride_datetime + parse_time  
                time = final_datetime.time()
                
            else:
                time = ride.time
                

            with transaction.atomic():
                booking_status = "active" if ride.instant_booking else "pending"
                seat_status = "approved" if ride.instant_booking else "pending"
                message = "segments booked successfully." if ride.instant_booking else "segments booking Requested."
                bookride = BookRide(
                    user=user,
                    ride=ride,
                    price=segment_price,
                    payment_status="pending",
                    booking_status=booking_status,
                    from_loc_name=from_loc_name,
                    pickup_time=time,
                    to_loc_name=to_loc_name,
                    
                )
                bookride.save()

                if ride.instant_booking:
                    seats.update(
                        status="booked",
                    )
                    bookride.seat_segments.set(seats)
                
                for seat in seats:
                    SeatRequest.objects.create(
                        user=user,
                        ride=ride,
                        seat=seat,
                        status=seat_status
                    )
                bookride.seat_segments.set(seats) 
                
                conversation =existing_conversation = Conversation.objects.filter(participants=user)\
                                            .filter(participants=ride.user)\
                                            .first()
                
                if not existing_conversation:
                    conversation = Conversation.objects.create()
                    conversation.participants.add(user, ride.user)
                    
                user_display_name = user.username  
                content = (
                    f"User {user_display_name} has requested for ride."
                    if booking_status == "pending"
                    else f"User {user_display_name} booked the ride."
                )
                Message.objects.create(
                    conversation=conversation,
                    sender=user,
                    content=content
                )               

            return Response({
                "success": True,
                "message": f"{seats.count()} {message}",
                "booking_id": bookride.id,
                "segment_price": segment_price
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({
                "success": False,
                "message": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    def get(self, request, user_id):
        user = get_object_or_404(Users, id=user_id)
        stats = request.GET.get('status', 'active')
        date = request.GET.get('date', datetime.now().date())
        bookings = BookRide.objects.filter(
            Q(user=user) & Q(booking_status=stats)& Q(ride__date=date)
        ).select_related('ride__user', 'ride__vehicle')

        booking_list = []

        for booking in bookings:
            ride = booking.ride
            rider = ride.user
            vehicle = ride.vehicle

            booking_list.append({
                "id": booking.id,
                "from": booking.from_loc_name,
                "to": booking.to_loc_name,
                "pickup_time": f"{ride.date}T{booking.pickup_time}",
                "price": str(booking.price),
                "payment_status":booking.payment_status,
                "ride": {
                    "date":ride.date,
                    "id": ride.id,
                    "is_tracking":ride.is_tracking,
                    "status":ride.status,
                    "rider": {
                        "name": rider.username,
                        "gender": rider.gender,
                        "profileImage": rider.profile_url or "",
                        "is_verified":rider.is_verified
                    },
                    "vehicle": {
                        "type": vehicle.vehicle_type,
                        "model": vehicle.vehicle_model,
                        "number": vehicle.vehicle_register_no
                    }
                }
            })

        return Response({
            "success": True,
            "data": booking_list
        }, status=status.HTTP_200_OK)
        


class CancelRide(APIView):
    def patch(self, request, book_id):
        try:
            reason = request.data.get('reason')
            if not reason:
                return Response({"success": False, "error": "Reason is required."}, status=status.HTTP_400_BAD_REQUEST)

            booking = BookRide.objects.select_related('user', 'ride__user').prefetch_related('seat_segments').filter(id=book_id).first()
            if not booking:
                return Response({"success": False, "error": "Booking not found."}, status=status.HTTP_404_NOT_FOUND)

            seats = list(booking.seat_segments.all())
            if not seats:
                return Response({"success": False, "error": "No seats found for this booking."}, status=status.HTTP_400_BAD_REQUEST)

            user = booking.user.username
            location = f"{booking.from_loc_name} -> {booking.to_loc_name}"
            no_seat = len(seats)

            conversation = Conversation.objects.filter(participants=booking.user)\
                                               .filter(participants=booking.ride.user)\
                                               .first()

            with transaction.atomic():
                for seat in seats:
                    seat.status = "vacant"
                Seat.objects.bulk_update(seats, ['status'])

                if conversation:
                    Message.objects.create(
                        conversation=conversation,
                        sender=booking.user,
                        content=(
                            f"{user} has cancelled the ride from {location}.\n"
                            f"Reason: {reason}.\n"
                            f"{no_seat} seat(s) are now vacant. Sorry for the inconvenience."
                        )
                    )

                if booking.payment_status == 'paid':
                    user_wallet = Wallet.objects.get(user=booking.user)
                    rider_wallet = Wallet.objects.get(user=booking.ride.user)

                    price = booking.price
                    commission = (price * Decimal("0.10")).quantize(Decimal("0.01"), rounding=ROUND_DOWN)
                    refund_amount = (price - commission).quantize(Decimal("0.01"), rounding=ROUND_DOWN)

                    WalletTransaction(
                        wallet=user_wallet,
                        transaction_type='credit',
                        amount=refund_amount,
                        description=f"₹{refund_amount} refunded for cancelled ride. ₹{commission} retained as cancellation fee."
                    ).save()

                    WalletTransaction(
                        wallet=rider_wallet,
                        transaction_type='debit',
                        amount=refund_amount,
                        description=(
                            f"₹{refund_amount} debited due to ride cancellation by {user} "
                            f"for trip from {booking.from_loc_name} to {booking.to_loc_name}."
                        )
                    ).save()
                booking.booking_status='cancelled'
                booking.save()

            return Response({
                "success": True,
                "message": "Ride cancelled and seats updated successfully.",
                "vacant_seats": no_seat
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({
                "success": False,
                "error": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        
class ApproveRide(APIView):
    def get(self, request, ride_id):
        ride = get_object_or_404(Ride, id=ride_id)
        allbookings = BookRide.objects.filter(ride=ride, booking_status="pending")

        approve_list = []

        for booking in allbookings:
            user = booking.user
            approve_list.append({
                "id": booking.id,
                "from": booking.from_loc_name,
                "to": booking.to_loc_name,
                "pickup_time": f"{ride.date}T{ride.time}",
                "price": str(booking.price),
                "seat_segments": [
                    {
                        "id": seat.id,
                        "seat_number": seat.seat_number,
                        "from": seat.from_short,
                        "to": seat.to_short,
                        "status": seat.status
                    }
                    for seat in booking.seat_segments.all()
                ],
                
                "user": {
                    "id": user.id,
                    "name": user.username,
                    "gender": user.gender,
                    "profileImage": user.profile_url or ""
                }
            })

        return Response({"success": True, "data": approve_list}, status=200)
    
    def post(self, request):
        book_ride_id = request.data.get("book_ride_id")
        approve = request.data.get("approve")

        if book_ride_id is None or approve is None:
            return Response({"error": "Missing 'book_ride_id' or 'approve' field."}, status=400)

        bookride = get_object_or_404(BookRide, id=book_ride_id)

        if bookride.booking_status != "pending":
            return Response({"error": "Booking already processed."}, status=400)

        message = "Booking approved and seats booked." if approve else "Booking rejected ."

        with transaction.atomic():
            seats = bookride.seat_segments.all()
            user = bookride.user
            ride = bookride.ride

            if approve:
                for seat in seats:
                    if seat.status != "vacant":
                        return Response({
                            "success": False,
                            "message": f"Seat segment {seat.id} is already booked."
                        }, status=400)

                for seat in seats:

                    seat.status = "booked"
                    seat.save()

                    SeatRequest.objects.filter(
                        user=user, ride=ride, seat=seat
                    ).update(status="approved")

                bookride.booking_status = "active"
                bookride.save()
                ONLINE_USERS = f'chat:online_users'
                curr_users = cache.get(ONLINE_USERS, []) 
                if user.id in [user["id"] for user in curr_users]:
                    channel_layer = get_channel_layer()
                    data = {
                        'type': 'notification',
                        'message': {
                            'sender': ride.user.username,
                            'content': f"{ride.user.username} Approved booked ride",
                        }
                    }
                        
                    async_to_sync(channel_layer.group_send)(
                        f'user_{user.id}',
                        data
                    )
                else:
                   Notification.objects.create(
                        sender=ride.user,
                        receiver=user,
                        message=f"{ride.user.username} Approved booked ride",
                    ) 
                
                
            if not approve:
                for seat in seats:

                    SeatRequest.objects.filter(
                        user=user, ride=ride, seat=seat
                    ).update(status="rejected")

                bookride.booking_status = "cancelled"
                bookride.save()
                
                ONLINE_USERS = f'chat:online_users'
                curr_users = cache.get(ONLINE_USERS, []) 
                if user.id in [user["id"] for user in curr_users]:
                    channel_layer = get_channel_layer()
                    data = {
                        'type': 'notification',
                        'message': {
                            'sender': ride.user.username,
                            'content': f"{ride.user.username} Rejected booked ride",
                        }
                    }
                    
                    async_to_sync(channel_layer.group_send)(
                        f'user_{user.id}',
                        data
                    )
                else:
                   Notification.objects.create(
                        sender=ride.user,
                        receiver=user,
                        message=f"{ride.user.username} Rejected booked ride",
                    )

                bookride.seat_segments.clear()

        return Response({"success": True, "message": message}, status=status.HTTP_200_OK)
        
class BookRideOtpVerify(APIView):
    def post(self, request):
        try:
            otp = request.data.get("otp")
            book_id = request.data.get("bookId")
            if not otp or not book_id:
                return Response(
                    {"success": False, "message": "OTP and Book ID are required"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            book = get_object_or_404(BookRide, id=book_id)
            if otp != book.book_otp:
                return Response(
                    {"success": False, "message": "OTP is invalid"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            book.verified_otp = True
            book.save()

            return Response({"success": True, "message": "OTP verified successfully"}, status=status.HTTP_200_OK)

        except BookRide.DoesNotExist:
            return Response(
                {"success": False, "message": "Booking not found"},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {"success": False, "message": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            ) 
            
class RideFinish(APIView):
    def post(self, request):
        location = request.data.get('location')
        ride_id = request.data.get('ride_id')

        if not ride_id or not location:
            return Response({"success": False, "message": "Some fields are missing"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            lat = float(location['latitude'])
            lng = float(location['longitude'])
        except (KeyError, TypeError, ValueError):
            return Response({"success": False, "message": "Invalid location format"}, status=status.HTTP_400_BAD_REQUEST)

        user_point = Point(lng, lat, srid=4326)

        try:
            ride = Ride.objects.annotate(
                dist=Distance('destination_location', user_point)
            ).get(id=ride_id)
        except Ride.DoesNotExist:
            return Response({"success": False, "message": "Ride not found"}, status=status.HTTP_404_NOT_FOUND)

        if ride.dist.m > 1000:
            return Response({
                "success": False,
                "message": f"Rider is {round(ride.dist.m / 1000, 2)} Km away, still need to go"
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            with transaction.atomic():
                ride.status = 'completed'
                ride.save()
                
                bookings = BookRide.objects.select_related('user__wallet', 'ride__user__wallet').filter(ride=ride)

                for book in bookings:
                    book.booking_status="completed"
                    book.save()
                    if book.payment_status == 'paid' and not book.verified_otp:
                        price = book.price
                        commission = (price * Decimal("0.05")).quantize(Decimal("0.01"), rounding=ROUND_DOWN)
                        refund_amount = (price - commission).quantize(Decimal("0.01"), rounding=ROUND_DOWN)

                        user_wallet = book.user.wallet
                        rider_wallet = book.ride.user.wallet

                        WalletTransaction.objects.create(
                            wallet=user_wallet,
                            transaction_type='credit',
                            amount=refund_amount,
                            description=(
                                f"₹{refund_amount} refunded for not joining the ride "
                                f"from {book.from_loc_name} to {book.to_loc_name}. ₹{commission} retained as commission fee."
                            )
                        )

                        WalletTransaction.objects.create(
                            wallet=rider_wallet,
                            transaction_type='debit',
                            amount=refund_amount,
                            description=(
                                f"₹{refund_amount} debited due to rider not joining the trip "
                                f"from {book.from_loc_name} to {book.to_loc_name}."
                            )
                        )

            return Response({"success": True, "message": "Ride marked as completed and refunds processed."}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"success": False, "message": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)