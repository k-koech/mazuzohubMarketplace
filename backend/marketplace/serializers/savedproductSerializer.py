from marketplace.models import Products
from rest_framework import serializers

class SavedProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products 
        depth=1      
        fields = ('__all__')
        
