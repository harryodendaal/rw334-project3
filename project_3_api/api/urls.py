from os import name
from django.urls import path
from . import views

urlpatterns = [
    path('posts/', views.post_list),
    path('posts/<int:pk>/', views.post_detail),
    path('register/', views.CustomUserCreate.as_view(), name='create_user'),
]
