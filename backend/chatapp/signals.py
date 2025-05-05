
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Message
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
import json

@receiver(post_save, sender=Message)
def send_message_notification(sender, instance, created, **kwargs):
    if not created:
        return 
    channel_layer = get_channel_layer()
    data = {
        'type': 'notification',
        'message': {
            'sender': instance.sender.username,
            'content': instance.content,
            'timestamp': instance.timestamp.isoformat(),
        }
    }

    for user in instance.conversation.participants.all():
        if user.id != instance.sender.id:
            async_to_sync(channel_layer.group_send)(
                f'user_{user.id}',
                data
            )
            