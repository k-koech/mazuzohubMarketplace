from marketplace.models import SavedProducts
from rest_framework import serializers

class SavedProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedProducts 
        depth=1      
        fields = ('__all__')
        
