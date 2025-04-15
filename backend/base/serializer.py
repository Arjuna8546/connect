from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Users,Vehicles
import re
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['role'] = user.role  
        return token

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['id','username','email','date_of_birth','phone_no','password','gender','profile_url','gov_url','bio','is_verified','status','gov_status','is_google']
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
    
    
class VehicleRegistrationSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset = Users.objects.all())
    class Meta:
        model = Vehicles
        fields = [
            'id',
            'user',
            'vehicle_type',
            'vehicle_model',
            'selected_vehicle',
            'vehicle_color',
            'vehicle_register_no',
            'vehicle_bio',
            'created_at',
            'updated_at',
            ]
        read_only_fields = ['id', 'created_at', 'updated_at']
        
    def validate_vehicle_type(self, value):
        valid_choices = [choice[0] for choice in Vehicles.VEHICLE_TYPE_CHOICES]
        if value not in valid_choices:
            raise serializers.ValidationError("Invalid Vehicle Type")
        return value
    
    def validate_vehicle_register_no(self, value):
        if not value or len(value.strip()) < 3:
            raise serializers.ValidationError("Vehicle registration number must be at least 3 characters.")
        if Vehicles.objects.filter(vehicle_register_no=value).exists():
            raise serializers.ValidationError("This registration number already exists.")
        return value.strip()
    
    def validate_user(self, value):
        if not Users.objects.filter(id=value.id).exists():
            raise serializers.ValidationError("User does not exist.")
        return value
        