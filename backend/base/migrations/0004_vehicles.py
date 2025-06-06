# Generated by Django 5.2 on 2025-04-09 05:12

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_users_gov_status_users_gov_url'),
    ]

    operations = [
        migrations.CreateModel(
            name='Vehicles',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('vehicle_type', models.CharField(choices=[('sedan', 'Sedan'), ('SUV', 'suv'), ('hatchback', 'Hatchback'), ('Wagon', 'wagon'), ('Minivan', 'minivan'), ('Coupe', 'coupe')], default='sedan', max_length=50)),
                ('vehicle_model', models.CharField(max_length=50)),
                ('vehicle_color', models.CharField(max_length=50)),
                ('vehicle_register_no', models.CharField(max_length=50, unique=True)),
                ('vehicle_bio', models.CharField(blank=True, max_length=255, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
