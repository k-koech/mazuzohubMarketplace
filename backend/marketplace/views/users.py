from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password, check_password
from ..email import send_new_password
from marketplace.serializers.userSerializers import UserSerializer
from marketplace.models import User
from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated, BasePermission, SAFE_METHODS
from rest_framework import viewsets, status
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
# from marketplace.currentuser import current_user 

from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect

# from ..email import send_new_password,send_user_credentials, send_message
import string    
import random  



def index(request):
    return render(request, "index.html")

def test(request):
    # return render(request, "newuser/credentials.html")
    return render(request, "password_template/sendpassword.html")

# Permission for data fetching
class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS
    

# ======================================================
# fetch users
@api_view(('GET',))
# @permission_classes((IsAuthenticated, ))
def users(request):    
    queryset = User.objects.all().order_by('-id')
    serializer = UserSerializer(queryset, many=True)
    return Response(serializer.data)

# Create a new user
@csrf_exempt
@api_view(('POST',))
# @permission_classes((IsAuthenticated, ))
def register_user(request):    
    data = request.data
    serializer = UserSerializer(data=data)

    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    email_exists=User.objects.filter(email=email).count()
    username_exists=User.objects.filter(username=username).count()

    if(email_exists > 0):
        return Response({"email_error":"User with this email already exist!"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    elif(username_exists > 0):
        return Response({"username_error":"User with this username exist!"}, status=status.HTTP_406_NOT_ACCEPTABLE)
    else:
        serializer = UserSerializer(data=request.data)            
        if serializer.is_valid():
            serializer.save(
                username=username,
                email=email,
                password=make_password(password)
            )
            return Response({"success":"User created successfully!"}, status=201)
        else:
            return Response({"error":"Something went wrong!"}, status=status.HTTP_406_NOT_ACCEPTABLE)


# Send new password to user
@csrf_exempt
@api_view(('POST',))
def send_password(request):    
    email=request.data.get('email')
    random_password = ''.join(random.choices(string.ascii_uppercase + string.digits, k = 5))    

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"email_error":"User with this email doesn't exist!"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    if request.method=="POST":
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            user = serializer.save(password = make_password(random_password))
            send_new_password(user.id,user.username,random_password,email)
            return Response({"success":"Email sent, check email!"}, status=201)
        else:
            return Response({"error":"Something went wrong!"}, status=201)



# Update new password to user
@csrf_exempt
@api_view(('PATCH',))
@permission_classes((IsAuthenticated, ))
def update_password(request):    
    oldpassword=request.data.get('oldpassword')
    newpassword=request.data.get('newpassword')

    try:
        user = User.objects.get(email=request.user.email)
    except User.DoesNotExist:
        return Response({"email_error":"User with this email doesn't exist!"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    if request.method=="PATCH":
        user=User.objects.get(email=request.user.email)
        print("Check pass ",user.check_password(oldpassword))
        if user.check_password(oldpassword):
            serializer = UserSerializer(user, data=request.data)
            if serializer.is_valid():
                user = serializer.save(password = make_password(newpassword))
                return Response({"success":"Password updated successfully!"}, status=201)
            else:
                return Response({"error":"Something went wrong!"}, status=status.HTTP_406_NOT_ACCEPTABLE)
        else:
            return Response({"password_error":"Your old password doesn't match with our records!"}, status=status.HTTP_406_NOT_ACCEPTABLE)

# Update username 
@csrf_exempt
@api_view(('PATCH',))
@permission_classes((IsAuthenticated, ))
def updateUsername(request):    
    username=request.data.get('username')  
    
    username_exists=User.objects.filter(username=request.user.username).count()
    user = User.objects.get(username=request.user.username)
 
    if(username_exists > 0 and user.username==request.user.username):
        if(user.username==username):
            return Response({"error":"You've made no changes!"}, status=status.HTTP_406_NOT_ACCEPTABLE)
        elif(user.is_username_updated==True):
            return Response({"error":"Username can only be changed once!"}, status=status.HTTP_406_NOT_ACCEPTABLE)
        else:
            user.username = username
            user.is_username_updated=True
            user.save()
            return Response({"success":"Username updated successfully!"}, status=201)
                
    else:
            return Response({"error":"User with this username already exist!"}, status=status.HTTP_406_NOT_ACCEPTABLE)


# Send user message 
@csrf_exempt
@api_view(('POST',))
def sendMessage(request):    
    subject=request.data.get('subject')
    message=request.data.get('message')
    email=request.data.get('email')  
    name=request.data.get('name') 

    if request.method=="POST":
        # send_message(name,subject,message, email)
        return Response({"success":"Email sent succesfully!"}, status=201)

@api_view(['GET'])
def current_user(request):
    user = request.user
    user = UserSerializer(user)
    print("XCurrwent user ", user)
    return Response(user.data)