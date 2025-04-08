from rest_framework import serializers
from .models import Users
import re

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['id','username','email','date_of_birth','phone_no','password','gender','profile_url','gov_url']
        read_only_fields = ['id']
        extra_kwargs = {
            'password' : {'write_only': True}
        }

    def validate_username(self,value):
        if Users.objects.filter(username=value).exists():
            raise serializers.ValidationError("username already exist it should be unique")
        if len(value)<3:
            raise serializers.ValidationError("Username must be at least 3 characters long.")
        return value
    
    def validate_email(self,value):
        if Users.objects.filter(email=value).exists():
            raise serializers.ValidationError("user with this email already exist it should be unique")
        return value
    
    def validate_phone_no(self,value):
        if not re.match(r'^\d{10}$', value):
            raise serializers.ValidationError("Phone number must be exactly 10 digits.")
        if Users.objects.filter(phone_no=value).exists():
            raise serializers.ValidationError("Phone number already exists.")
        return value
    
    def validate_password(self,value):
        if len(value) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long.")
        if not re.search(r'[A-Za-z]', value) or not re.search(r'\d', value):
            raise serializers.ValidationError("Password must contain at least one letter and one number.")
        return value
    
    def create(self, validated_data):
        return Users.objects.create_user(**validated_data)