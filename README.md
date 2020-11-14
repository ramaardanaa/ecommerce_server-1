# Ecommerce CMS


### GET /products

> Get all products

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
   {
        "id": 10,
        "name": "ipon 12",
        "image_url": "https://awsimages.detik.net.id/community/media/visual/2019/11/14/bb500fc1-b9e1-4862-84dd-90ef75fb36e0_43.jpeg?w=700&q=90",
        "price": 290000000,
        "stock": 144,
        "UserId": 1,
        "createdAt": "2020-11-14T08:11:59.055Z",
        "updatedAt": "2020-11-14T08:11:59.055Z"
    },
]
```

_Response (400 - Bad Request)_
```
{
  "error": "Invalid request"
}
```
---

### GET /products/:id
> Get products by Id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
   {
        "id": 10,
        "name": "ipon 12",
        "image_url": "https://awsimages.detik.net.id/community/media/visual/2019/11/14/bb500fc1-b9e1-4862-84dd-90ef75fb36e0_43.jpeg?w=700&q=90",
        "price": 290000000,
        "stock": 144,
        "UserId": 1,
        "createdAt": "2020-11-14T08:11:59.055Z",
        "updatedAt": "2020-11-14T08:11:59.055Z"
    },
]
```

_Response (400 - Bad Request)_
```
{
  "error": "Invalid request"
}
```
---

### POST /products

> Create new products

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
   "name": "ipon 12",
    "image_url": "https://awsimages.detik.net.id/community/media/visual/2019/11/14/bb500fc1-b9e1-4862-84dd-90ef75fb36e0_43.jpeg?w=700&q=90",
    "price": 290000000,
    "stock": 144,
}
```

_Response (201 - Created)_
```

     {
        "id": 10,
        "name": "ipon 12",
        "image_url": "https://awsimages.detik.net.id/community/media/visual/2019/11/14/bb500fc1-b9e1-4862-84dd-90ef75fb36e0_43.jpeg?w=700&q=90",
        "price": 290000000,
        "stock": 144,
        "UserId": 1,
        "createdAt": "2020-11-14T08:11:59.055Z",
        "updatedAt": "2020-11-14T08:11:59.055Z"
    },

```

_Response (400 - Bad Request)_
```
{
  "error": "Invalid requests"
}
```
---
### PUT /products/:id

> Update existing products

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
   "name": "ipon 12",
    "image_url": "https://awsimages.detik.net.id/community/media/visual/2019/11/14/bb500fc1-b9e1-4862-84dd-90ef75fb36e0_43.jpeg?w=700&q=90",
    "price": 290000000,
    "stock": 144,
}
```

_Response (200 - Success)_
```
 {
        "id": 10,
        "name": "ipon 12",
        "image_url": "https://awsimages.detik.net.id/community/media/visual/2019/11/14/bb500fc1-b9e1-4862-84dd-90ef75fb36e0_43.jpeg?w=700&q=90",
        "price": 290000000,
        "stock": 144,
        "UserId": 1,
        "createdAt": "2020-11-14T08:11:59.055Z",
        "updatedAt": "2020-11-14T08:11:59.055Z"
    },
```

_Response (400 - Bad Request)_
```
{
  "error": "Invalid requests"
}
```
---
### DELETE /products/:id

> delete existing products

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Response (200 - Success)_
```
{
    "msg": "success delete product with id 4"
}
```

_Response (400 - Bad Request)_
```
{
  "error": "Invalid requests"
}
```
----

# USER

### POST Register
----
  Create a new user in the database

 _Request Body_
```json
{
      "email" : "user@mail.com",
      "password" : "userPassword",
      "role":"admin"
}

```

_Response (201)_

  ```json    
    {
      "msg":"Register Success"
    }
  ```
 
_Response (500 - Internal Server error)_
```json
{
  "error": "Internal Server error"
}
``` 
----

### POST login
----
  Login into user in the database

 _Request Body_
```json
{
      "email" : "user@mail.com",
      "password" : "userPassword",
}

```

_Response (200)_

  ```json    
    {
      "access_token":"9aqwe39e39e33r390jw9hdin389hdid89whdionahhOIINhjsi9IJn2jwj934e3n"
    }
  ```
 
_Response (500 - Internal Server error)_
```
{
  "error": "Internal Server error"
}
```
----

### GET /banners

> Get all banners

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
  {
    "id": 1,
    "title": "new year",
    "status": false,
    "image_url": "https://image.freepik.com/free-vector/new-year-sale-banner_32996-361.jpg",
    "UserId": 1,
    "updatedAt": "2020-11-14T09:44:26.602Z",
    "createdAt": "2020-11-14T09:44:26.602Z"
 }

]
```

_Response (400 - Bad Request)_
```
{
  "error": "Invalid request"
}
```
---


### POST /banners

> Create new banner

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
   "title": "new year",
   "image_url": "https://image.freepik.com/free-vector/new-year-sale-banner_32996-361.jpg",
}
```

_Response (201 - Created)_
```

{
    "id": 1,
    "title": "new year",
    "status": false,
    "image_url": "https://image.freepik.com/free-vector/new-year-sale-banner_32996-361.jpg",
    "UserId": 1,
    "updatedAt": "2020-11-14T09:44:26.602Z",
    "createdAt": "2020-11-14T09:44:26.602Z"
}

```

_Response (400 - Bad Request)_
```
{
  "error": "Invalid requests"
}
```
---
### PUT /banners/:id

> Update existing banners

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
   "title": "new year",
   "image_url": "https://image.freepik.com/free-vector/new-year-sale-banner_32996-361.jpg",
}
```

_Response (200 - Success)_
```
 {
    "id": 1,
    "title": "new year",
    "status": false,
    "image_url": "https://image.freepik.com/free-vector/new-year-sale-banner_32996-361.jpg",
    "UserId": 1,
    "updatedAt": "2020-11-14T09:44:26.602Z",
    "createdAt": "2020-11-14T09:44:26.602Z"
},
```

_Response (400 - Bad Request)_
```
{
  "error": "Invalid requests"
}
```
---

### PATCH /banners/:id

> Update status existing banners

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
   status: true
}
```

_Response (200 - Success)_
```
 {
    "id": 1,
    "title": "new year",
    "status": true,
    "image_url": "https://image.freepik.com/free-vector/new-year-sale-banner_32996-361.jpg",
    "UserId": 1,
    "updatedAt": "2020-11-14T09:44:26.602Z",
    "createdAt": "2020-11-14T09:44:26.602Z"
},
```

_Response (400 - Bad Request)_
```
{
  "error": "Invalid requests"
}
```
---

### DELETE /banners/:id

> delete existing products

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Response (200 - Success)_
```
{
    "msg": "success delete banner with id 4"
}
```

_Response (400 - Bad Request)_
```
{
  "error": "Invalid requests"
}
```
----