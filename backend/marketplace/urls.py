from rest_framework_simplejwt.views import (TokenObtainPairView,TokenRefreshView,)
from django.urls import path
from .views.users import register_user, send_password, update_password,users, current_user
# , sendPassword,updatePassword,index,sendMessage,  UsersViewSet,updateUsername
from .views.products import addProduct, deleteProduct, products
from .views.savedproducts import savedProducts,saveProduct
from .views.categories import addCategory, categories


urlpatterns = [
    path('users', users),
    path('users/adduser', register_user),
    path("users/current_user", current_user ), 
    path("users/sendpassword", send_password),
    path("users/updatepassword", update_password),

    path('products', products),
    path('products/addproduct', addProduct),
    path('products/<int:pk>', deleteProduct),

    path('savedproducts', savedProducts),
    path('savedproducts/add', saveProduct),

    path('categories', categories),
    path('categories/addcategory', addCategory),


    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
