from django.contrib.auth import get_user_model
from django.contrib.gis.geos.point import Point
from django.shortcuts import render
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from .models import Chat, Message, Post, Comment, ApiGroup
from .serializers import ChatSerializer, MessageSerializer, PostCreateSerializer, PostSerializer, PostReadSerializer, RegisterUserSerializer, ApiGroupCreateSerializer, ApiGroupUpdateSerializer, UserSerializer, CommentSerializer
from .permissions import IsOwnerOrReadOnly, IsGroupAdminOrReadOnly
from .filters import filter


User = get_user_model()


class GroupList(generics.ListCreateAPIView):
    queryset = ApiGroup.objects.all()
    serializer_class = ApiGroupCreateSerializer
    permission_classes = [IsAuthenticated, IsGroupAdminOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(admins=[self.request.user])


class GroupDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ApiGroup.objects.all()
    serializer_class = ApiGroupUpdateSerializer
    permission_classes = [IsAuthenticated, IsGroupAdminOrReadOnly]

    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)


class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = User.objects.all()
        # Optionally filters by username
        username = self.request.query_params.get('username')
        if username is not None:
            queryset = queryset.filter(username=username)
        return queryset

    



class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # permission_classes = [IsAuthenticated]

    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)


class PostList(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        group_name = serializer.validated_data['group']
        group = ApiGroup.objects.filter(name=group_name)[0]
        serializer.save(user=self.request.user, group=group)

    def get_queryset(self):
        queryset = Post.objects.all()
        #print(self.request.__dict__)
        filterby = self.request.query_params.get('country')
        filterterm = self.request.query_params.get('category')
        
                
        # Optionally filters by username
        #username = self.request.query_params.get('username')
        #print(self.request.POST)
        #if username is not None:
        #    queryset = queryset.filter(user__username=username)
        return filter(filterby, filterterm, queryset)
        #return queryset

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return PostReadSerializer
        elif self.request.method == 'POST':
            return PostCreateSerializer
        else:
            return self.serializer_class


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    # def get_serializer_class(self):
    #     if self.request.method == 'GET':
    #         return PostReadSerializer
    #     else:
    #         return self.serializer_class


class CommentList(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)


class CustomUserCreate(APIView):

    permission_classes = [AllowAny]

    def post(self, request):
        reg_serializer = RegisterUserSerializer(data=request.data)
        if reg_serializer.is_valid():
            newuser = reg_serializer.save()
            if newuser:
                return Response(status=status.HTTP_201_CREATED)
        return Response(reg_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# def chat_index(request):
#     return render(request, "api/index.html")

# def room(request, room_name):
#     return render(request, 'api/room.html', {
#         'room_name': room_name
#     })


class ChatList(generics.ListCreateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    filterset_fields = ['name']


class ChatDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer


class MessageList(generics.ListCreateAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer


class MessageDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
