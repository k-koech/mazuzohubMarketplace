from marketplace.models import Products
from rest_framework import serializers

class ProductSerializer(serializers.ModelSerializer):
    # username = serializers.CharField(required=False)
    # email = serializers.CharField(required=False)

    class Meta:
        model = Products 
        depth=1      
        # extra_kwargs = {'password': {'write_only': True}}
        fields = ('__all__')
        
