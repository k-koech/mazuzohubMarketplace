from rest_framework.response import Response
from marketplace.serializers.categorySerializer import CategorySerializer
from marketplace.models import Categories
from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated, BasePermission, SAFE_METHODS
from rest_framework import viewsets, status
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
# from marketplace.currentuser import current_user 
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect


def test(request):
    # return render(request, "newuser/credentials.html")
    return render(request, "password_template/sendpassword.html")

# Permission for data fetching
class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS
    


# =================Categories==================================
# fetch category
@api_view(('GET',))
# @permission_classes((IsAuthenticated, ))
def categories(request):    
    queryset = Categories.objects.all().order_by('-id')
    serializer = CategorySerializer(queryset, many=True)
    return Response(serializer.data)


# Add category
@csrf_exempt
@api_view(('POST',))
# @permission_classes((IsAuthenticated, ))
def addCategory(request):    
    name = request.data.get('name')
   
    serializer = CategorySerializer(data=request.data)       
    if serializer.is_valid():
        serializer.save(name=name )
        return Response({"success":"Category created successfully!"}, status=201)
    
    else:
        print("XXX ", serializer) 
        return Response({"error":"Something went wrong!"}, status=status.HTTP_406_NOT_ACCEPTABLE)

