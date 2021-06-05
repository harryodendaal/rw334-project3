from django.conf import settings
from django.contrib.auth.models import AbstractUser
# from django.db import models
from django.contrib.gis.db import models
from django.contrib.gis.geos import Point

# Create your models here.
class ApiGroup(models.Model):
    users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='api_groups')
    name = models.CharField(max_length=150, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-timestamp']


class Post(models.Model):
    group = models.ForeignKey(ApiGroup, related_name='posts', on_delete=models.CASCADE, null=True)
    location = models.PointField(geography=True, default=Point(0.0, 0.0))
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='posts', default=1, on_delete=models.CASCADE)
    title = models.CharField(max_length=130)
    category = models.CharField(max_length=130, null=True)
    content = models.TextField(null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-timestamp']

    def __str__(self):
        return self.title


class User(AbstractUser):
    avatar = models.ImageField(upload_to='upload/', blank=True, null=True)
    friends = models.ManyToManyField('self', blank=True)

    class Meta:
        ordering = ['id']

class Comment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='comments', default=1, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, related_name='comments', default=1, on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-timestamp']