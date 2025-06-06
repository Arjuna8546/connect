# Generated by Django 5.2 on 2025-04-08 13:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_users_gender'),
    ]

    operations = [
        migrations.AddField(
            model_name='users',
            name='gov_status',
            field=models.CharField(choices=[('pending', 'Pending'), ('reject', 'Reject'), ('verified', 'Verified')], default='pending', max_length=10),
        ),
        migrations.AddField(
            model_name='users',
            name='gov_url',
            field=models.URLField(blank=True, null=True),
        ),
    ]
