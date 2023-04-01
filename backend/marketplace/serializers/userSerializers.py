from marketplace.models import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=False)
    email = serializers.CharField(required=False)

    class Meta:
        model = User        
        extra_kwargs = {'password': {'write_only': True}}
        fields = ('id', 'username', 'email', "is_admin","is_staff")
        
