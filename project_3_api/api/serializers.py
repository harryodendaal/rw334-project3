from django.db.models import fields
from rest_framework import serializers
from .models import Chat, Message, Post, User, Comment, ApiGroup


class ApiGroupCreateSerializer(serializers.ModelSerializer):
    posts = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = ApiGroup
        fields = ['id', 'name', 'timestamp', 'users', 'posts', 'admins']
        read_only_fields = ['admins']


class ApiGroupUpdateSerializer(serializers.ModelSerializer):
    posts = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = ApiGroup
        fields = ['id', 'name', 'timestamp', 'users', 'posts', 'admins']


class PostSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    comments = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    # group = ApiGroupCreateSerializer()

    class Meta:
        model = Post
        fields = ['id', 'group', 'location', 'user', 'title', 'category', 'content', 'timestamp', 'updated', 'comments']

class PostReadSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    comments = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    group = serializers.ReadOnlyField(source='group.name')

    class Meta:
        model = Post
        fields = ['id', 'group', 'location', 'user', 'title',
                  'category', 'content', 'timestamp', 'updated', 'comments']


class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ['id', 'user', 'post', 'content', 'timestamp']


class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            # can hash password here
            instance.set_password(password)
        instance.save()
        return instance


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'avatar', 'friends']
        # read_only_fields = ['id', 'username']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class MessageSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Message
        fields = ['id', 'user', 'chat', 'content', 'timestamp']


class ChatSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True)

    class Meta:
        model = Chat
        fields = ['id', 'name', 'messages']
