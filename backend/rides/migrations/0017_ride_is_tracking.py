# Generated by Django 5.2 on 2025-05-19 05:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rides', '0016_bookride_pickup_time'),
    ]

    operations = [
        migrations.AddField(
            model_name='ride',
            name='is_tracking',
            field=models.BooleanField(default=False),
        ),
    ]
