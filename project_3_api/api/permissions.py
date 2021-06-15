from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner of the snippet.
        return obj.user == request.user

class IsGroupAdminOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow admins of the group to edit it.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # request method is put and only changing the users by adding users
        if request.method == 'PUT' and 'name' not in request.data and 'admins' not in request.data:
            return True
        # Write permissions are only allowed to the admins of the group.
        return request.user in obj.admins.all()