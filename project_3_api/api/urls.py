from os import name
from django.urls import path
from . import views

urlpatterns = [
    path('posts/', views.post_list),
    path('posts/<int:pk>/', views.post_detail),
    path('comments/', views.comment_list),
    path('comments/<int:pk>/', views.comment_detail),
    path('groups/', views.apigroup_list),
    path('groups/<int:pk>/', views.apigroup_detail),
    path('users/', views.user_list),
    path('users/<int:pk>/', views.user_detail),
    path('register/', views.CustomUserCreate.as_view(), name='create_user'),
]
