from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self,username,email,phone_no,date_of_birth,password=None,**extra_fields):
        if not email:
            raise ValueError("The Email feild must be set")
        email = self.normalize_email(email)
        user = self.model(username = username,email=email,phone_no = phone_no,date_of_birth=date_of_birth,**extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self,username,email,phone_no,date_of_birth,password=None,**extra_fields):
        extra_fields.setdefault("is_verified",True)
        extra_fields.setdefault("status","active")
        extra_fields.setdefault("role","admin")
        user = self.create_user(username, email, phone_no, date_of_birth, password, **extra_fields)
        Wallet.objects.get_or_create(user=user)

        return user



class Users(AbstractBaseUser):
    STATUS_CHOICE =[
        ("active","Active"),
        ("blocked","Blocked")
    ]

    ROLE_CHOICES = [
        ("admin","Admin"),
        ("user","User")
    ]
    GENDER_CHOICES = [
        ("male","Male"),
        ("female","Female")
    ]
    GOVID_STATUS_CHOICES = [
        ("pending","Pending"),
        ("reject","Reject"),
        ("verified","Verified"),
    ]

    username = models.CharField(max_length=150, unique=True)
    profile_url = models.URLField(blank=True,null=True)
    gov_url = models.URLField(blank=True,null=True)
    gov_status = models.CharField(max_length=10,choices=GOVID_STATUS_CHOICES,default="pending")
    bio = models.TextField(blank=True,null=True)
    gender = models.CharField(max_length=10,choices=GENDER_CHOICES,default="male")
    email =models.EmailField(unique=True)
    date_of_birth = models.DateField()
    phone_no = models.CharField(max_length=15,unique=True)
    password = models.CharField(max_length=128)
    is_verified = models.BooleanField(default=False)
    is_google = models.BooleanField(default=False)
    status = models.CharField(max_length=10,choices=STATUS_CHOICE,default="active")
    role = models.CharField(max_length=10,choices=ROLE_CHOICES,default="user")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username","phone_no","date_of_birth"]

    def __str__(self):
        return self.username



class Vehicles(models.Model):
    
    VEHICLE_TYPE_CHOICES =[
        ("sedan","Sedan"),
        ("SUV","suv"),
        ("hatchback","Hatchback"),
        ("Wagon","wagon"),
        ("Minivan","minivan"),
        ("Coupe","coupe")
    ]
    
    user = models.ForeignKey('Users', on_delete=models.CASCADE, null=False)
    vehicle_type = models.CharField(max_length=50,choices=VEHICLE_TYPE_CHOICES,default="sedan")
    selected_vehicle = models.BooleanField(default=False)
    vehicle_model = models.CharField(max_length=50)
    vehicle_color = models.CharField(max_length=50)
    vehicle_register_no = models.CharField(max_length=50, unique=True)
    vehicle_bio = models.CharField(max_length=255,blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    

class Wallet(models.Model):
    user = models.OneToOneField(Users, on_delete=models.CASCADE, related_name='wallet')
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user}'s Wallet"


class WalletTransaction(models.Model):
    TRANSACTION_TYPE_CHOICES = [
        ('credit', 'Credit'),
        ('debit', 'Debit'),
    ]

    wallet = models.ForeignKey(Wallet, on_delete=models.CASCADE, related_name='transactions')
    transaction_type = models.CharField(max_length=6, choices=TRANSACTION_TYPE_CHOICES)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    timestamp = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.pk: 
            if self.transaction_type == 'credit':
                self.wallet.balance += self.amount
            elif self.transaction_type == 'debit':
                if self.wallet.balance < self.amount:
                    raise ValueError("Insufficient wallet balance.")
                self.wallet.balance -= self.amount
            self.wallet.save()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.transaction_type} ₹{self.amount} on {self.timestamp.strftime('%Y-%m-%d')}"