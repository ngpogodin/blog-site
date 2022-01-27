# blog-site
Pet-project.Simple REST API(Node.js/express+ mongoDb)

# Authentication Header:
You can read the authentication header from the headers of the request

Authorization: token accessJwtToken.here

# Authentication:

### POST /api/users/login

Requires no auth, creates new user if not exists, or sings in existent user by generating JWT Token

#### Example request body:
```
{
  "user":{
    "user": "Arnold@gmail.com",
    "password": "ArnoldArnold"
  }
}
```

#### Response return User: 
```
{
  "user": {
    "email": "Arnold@gmail.com",
    "token": "jwt.token.here",
    "username": "Arnold",
    "bio": "I am an actor",
    "image": null
  }
}
```
# Registarion 

### POST /api/users

Requires no auth, creates new user if not exists

#### Example request body:
```
{
  "user":{
    "username": "Arnold",
    "email": "Arnold@gmail.com",
    "password": "ArnoldArnold"
  }
}
```
#### Response return User as in POST /api/users/login.

# Get Current User

### GET /api/user

Authentication required, returns the User

# Update User

### PUT /api/user

Authentication required, returns the updated User

#### Example request body:
```
{
  "user":{
    "email": "Arnold@gmail.com",
    "bio": "I like to skateboard",
    "image": "https://i.stack.imgur.com/xHWG8.jpg"
  }
}
```
Accepted fields: email, username, password, image, bio

# Get Profile

### GET /api/profiles/:username

Authentication required, returns the Profile

Example Profile:

```
{
  "profile": {
    "username": "Arnold
    "bio": "I work at statefarm",
    "image": "",
    "following": []
  }
}
```

# Follow user

### POST /api/profiles/:username/follow

Authentication required, returns a Profile

No additional parameters required

# Unfollow user

### DELETE /api/profiles/:username/follow

Authentication required, returns a Profile

No additional parameters required

# List Articles

### GET /api/articles

Returns most recent articles globally by default, provide tag, author or favorited query parameter to filter results

#### Query parameters:

##### Filter by author:

?tag=NodeJs

##### Filter by author:

?author=Arnold

##### Favorited by user:

?favorited=Arnold

#### Limit number of articles :

?limit=20

#### Offset/skip number of articles :

?offset=0

Authentication optional, will return multiple articles, ordered by most recent first

Example of single Article:

```
{
  "article": {
    "slug": "how-to-train-your-dragon",
    "title": "How to train your dragon",
    "description": "Ever wonder how?",
    "body": "It takes a Arnold",
    "tagList": ["dragons", "training"],
    "createdAt": "2016-02-18T03:22:56.637Z",
    "updatedAt": "2016-02-18T03:48:35.824Z",
    "author": {
      "username": "Arnold",
      "bio": "I work at statefarm",
      "image": "https://i.stack.imgur.com/xHWG8.jpg",
      "following": false
    }
  }
}
```

# Feed Articles

### GET /api/articles/feed

Can also take limit and offset query parameters like List Articles

Authentication required, will return multiple articles created by followed users, ordered by most recent first.

# Get Article

### GET /api/articles/:slug

No authentication required, will return single Artcile:

# Create Article

### POST /api/articles

#### Example request body:
```
{
  "article": {
    "title": "How to train your dragon",
    "description": "Ever wonder how?",
    "body": "You have to believe",
    "tagList": ["reactjs", "angularjs", "dragons"]
  }
}
```
Authentication required, will return an Article

Required fields: title, description, body

# Update Article

### PUT /api/articles/:slug

Example request body:
```
{
  "article": {
    "title": "Did you train your dragon?"
  }
}
```
Authentication required, returns the updated Article


# Delete Article

### DELETE /api/articles/:slug

Authentication required

# Add Comments to an Article
### POST /api/articles/:slug/comments

Example request body:
```
{
  "comment": {
    "body": "His name was my name too."
  }
}
```
Authentication required, returns the created Comment

# Get Comments from an Article

### GET /api/articles/:slug/comments

Authentication optional, returns multiple Comments

# Delete Comment
### DELETE /api/articles/:slug/comments/:id

Authentication required

# Favorite Article
### POST /api/articles/:slug/favorite

Authentication required, returns the Article

# Unfavorite Article
### DELETE /api/articles/:slug/favorite

Authentication required, returns the Article

# Postman link for request collection 

https://www.getpostman.com/collections/1d7775372d4123fa1d81
