import os
from django.conf import settings
from rest_framework.response import Response
from marketplace.serializers.savedproductSerializer import SavedProductSerializer
from marketplace.models import SavedProducts, User, Products
from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated, BasePermission, SAFE_METHODS
from rest_framework import viewsets, status
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
# from marketplace.currentuser import current_user 
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect


# Permission for data fetching
class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS
    


# =================Saved Product==================================
# fetch saved products
@api_view(('GET',))
# @permission_classes((IsAuthenticated, ))
def savedProducts(request):    
    queryset = SavedProducts.objects.all().order_by('-id')
    serializer = SavedProductSerializer(queryset, many=True)
    return Response(serializer.data)


# Add product
@csrf_exempt
@api_view(('POST',))
# @permission_classes((IsAuthenticated, ))
def saveProduct(request):    
    productid = request.data.get('id')
    
    products_count = Products.objects.filter(pk=productid).count()  
    product = Products.objects.get(pk=productid)

    if products_count>0:
        serializer = SavedProductSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(product=product, user=request.user)
            return Response({"success":"Product saved to favourites!"}, status=201)
        
        else:
            print("Serializers ", serializer.errors)
            return Response({"error":"Something went wrong!"}, status=status.HTTP_406_NOT_ACCEPTABLE)
    else:
        return Response({"error":"Product does not exist"}, status=status.HTTP_406_NOT_ACCEPTABLE)


@csrf_exempt
@api_view(('DELETE',))
# @permission_classes((IsAuthenticated, ))
def deleteProduct(request, pk=None):    
    products = SavedProducts.objects.filter(pk=pk).count()
    if products > 0:        
        product = SavedProducts.objects.get(pk=pk)

        # Check first if the file exists before deleting from the directory
        if(product.image):
            if os.path.exists(os.path.join(settings.MEDIA_ROOT, str(product.image)) ):
                os.remove(os.path.join(settings.MEDIA_ROOT, str(product.image) ))

                dir = os.path.join(settings.MEDIA_ROOT, ("/".join(str(product.image).split("/",-2)[:2])) )
                list_dir = os.listdir(dir)
                print("Dir length ",len(list_dir))
                if len(list_dir) == 0:
                    os.rmdir(dir)
            else:
                print("PATH DOES NOT EXIST")

        product.delete()
        return Response({"success":"Product deleted Successfully!"},status=201)

    else:
        return Response({"error":"Product does not exist!"},status=status.HTTP_204_NO_CONTENT)


