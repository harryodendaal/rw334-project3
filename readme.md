# Installation
--
# API examples
The post and comments are created for the user who made the request. This can be changed if necessary.

## Post

URL: api/posts/

Create a post. Take note of the location field format, POINT(longitude, latitude).

```
{
    "group": 2,
    "location": "POINT(-0.5, 33)",
    "title": "Title 1",
    "category": "Animals",
    "content": "Content about animals..",
}
```

## Comment

URL: api/comments/

Create a comment.

```
{
    "content": "Comment for post 5",
    "post": 5
}
```

## Group

URL: api/groups/

Create a group. The user IDs are passed as a list.

```
{
    "name": "A random group name",
    "users": [1,2]
}
```

## User

URL: api/users/

We might not use these endpoints for users, but they are here if we need to.

Create a user.

```
{
    "username": "Username1052",
    "password": "Averycoolpassword1"
}
```

Update user with ID of 1 with an avatar image and friends.The friend IDs are passed as a list. The avatar image must be passed as a file field.

URL: api/users/1/

```
{
    "friends": [1, 2]
}
```

It will return something like the following:

```
{
  "id": 1,
  "username": "admin",
  "avatar": "/upload/avatar.jpeg",
  "friends": [
    3
  ]
}
```

At the moment the avatar image will be uploaded to a directory, in the base directory, called upload. 

You can view the avatar image by going to the url /upload/avatar.jpeg