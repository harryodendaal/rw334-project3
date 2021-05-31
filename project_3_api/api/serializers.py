from django.db.models import fields
from rest_framework import serializers
from .models import Post, User, Comment


class PostSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    comments = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'user', 'title', 'category', 'content', 'timestamp', 'updated', 'comments']

class CommentCreateSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    post = serializers.IntegerField()
    
    class Meta:
        model = Comment
        fields = ['id', 'user', 'post', 'content', 'timestamp']

    def validate_post(self, value):
        """
        Check that the post corresponding to the post ID exists.
        """
        try:
            Post.objects.get(pk=value)
        except Post.DoesNotExist:
            return serializers.ValidationError(f"Post with ID {value} does not exist.")

        return value

    def create(self, validated_data):
        post = Post.objects.get(pk=validated_data["post"])
        content = validated_data["content"]
        user = validated_data["user"]
        comment = Comment(post=post, content=content, user=user)
        comment.save()
        return validated_data

class CommentViewUpdateSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    post = serializers.ReadOnlyField(source='post.title')
    
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
