from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **kwargs):
        """Create and return a `User` with an email, phone number, username and password."""
        if username is None:
            raise TypeError('Users must have a username.')
        if email is None:
            raise TypeError('Users must have an email.')

        user = self.model(username=username, email=self.normalize_email(email))
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, username, email, password):
        """
        Create and return a `User` with superuser (admin) permissions.
        """
        if password is None:
            raise TypeError('Superusers must have a password.')
        if email is None:
            raise TypeError('Superusers must have an email.')
        if username is None:
            raise TypeError('Superusers must have an username.')

        user = self.create_user(username, email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(db_index=True, max_length=255, unique=True)
    email = models.EmailField(db_index=True, unique=True,  null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    password = models.CharField( max_length=100)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = UserManager()

    def __str__(self):
        return f"{self.email}"
    
class Profile():
    image =  models.FileField(upload_to='prodile_pics/%Y:%m:%d', null=False)  
    is_username_updated = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class Products(models.Model):
    title = models.CharField( max_length=130) 
    description = models.TextField()
    color = models.CharField( max_length=130)  
    price = models.FloatField(null=False)
    region = models.CharField(max_length=100,null=False)
    image =  models.FileField(upload_to='products/%Y:%m:%d', null=True)  
    date_posted = models.DateTimeField(verbose_name='date posted', auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class Categories(models.Model):
    name = models.CharField( max_length=50) 