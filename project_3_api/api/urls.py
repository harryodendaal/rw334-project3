from os import name
from django.urls import path
from . import views

urlpatterns = [
    path('posts/', views.PostList.as_view()),
    path('posts/<int:pk>/', views.PostDetail.as_view()),
    path('comments/', views.CommentList.as_view()),
    path('comments/<int:pk>/', views.CommentDetail.as_view()),
    path('groups/', views.GroupList.as_view()),
    path('groups/<int:pk>/', views.GroupDetail.as_view()),
    path('users/', views.UserList.as_view()),
    path('users/<int:pk>/', views.UserDetail.as_view()),
    path('register/', views.CustomUserCreate.as_view(), name='create_user'),
    # path('chat/', views.chat_index, name='chat_index'),
    # path('chat/<str:room_name>/', views.room, name='room'),
    path('messages/', views.MessageList.as_view()),
    path('messages/<int:pk>/', views.MessageDetail.as_view()),
    path('chats/', views.ChatList.as_view()),
    path('chats/<int:pk>/', views.ChatDetail.as_view()),
]
