# Ride Booking API

A Node.js based Ride Booking Backend API.

## Base URL

```http
http://localhost:3000
```

---

# User APIs

## Register User

Create a new user account.

```http
POST /user/register
```

### Request Body

```json
{
  "fullname": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

### Response

```json
{
  "message": "User registered successfully"
}
```

---

## Login User

Authenticate user and generate token.

```http
POST /user/login
```

### Request Body

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

### Response

```json
{
  "token": "jwt_token"
}
```

---

## User Profile

Get logged-in user profile.

```http
GET /user/profile
```

### Headers

```http
Authorization: Bearer <token>
```

---

# Captain APIs

## Register Captain

Create a new captain account.

```http
POST /captain/register
```

### Request Body

```json
{
  "fullname": "Captain John",
  "email": "captain@example.com",
  "password": "123456",
  "vehicle": {
    "color": "White",
    "plate": "UP32AB1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

---

## Login Captain

Authenticate captain.

```http
POST /captain/login
```

### Request Body

```json
{
  "email": "captain@example.com",
  "password": "123456"
}
```

---

## Captain Profile

Get captain profile.

```http
GET /captain/profile
```

### Headers

```http
Authorization: Bearer <token>
```

---

## Logout Captain

Logout current captain.

```http
GET /captain/logout
```

### Headers

```http
Authorization: Bearer <token>
```

---

## Toggle Availability

Enable or disable captain availability.

```http
PATCH /captain/toggle-availability
```

### Headers

```http
Authorization: Bearer <token>
```

### Response

```json
{
  "available": true
}
```

---

## Get New Ride

Fetch available ride requests.

```http
GET /captain/new-ride
```

### Headers

```http
Authorization: Bearer <token>
```

---

## Accept Ride

Accept a ride request.

```http
PUT /captain/accept-ride
```

### Headers

```http
Authorization: Bearer <token>
```

### Request Body

```json
{
  "rideId": "ride_id"
}
```

---

# Ride APIs

## Create Ride

Create a new ride request.

```http
POST /ride/create-ride
```

### Headers

```http
Authorization: Bearer <token>
```

### Request Body

```json
{
  "pickup": "Location A",
  "destination": "Location B",
  "vehicleType": "car"
}
```

### Response

```json
{
  "rideId": "ride_id"
}
```

---

## Get Accepted Ride

Fetch accepted ride details.

```http
GET /ride/accepted-ride
```

### Headers

```http
Authorization: Bearer <token>
```

### Response

```json
{
  "ride": {}
}
```

---

# Authentication

Protected routes require JWT token.

```http
Authorization: Bearer <JWT_TOKEN>
```

---

# HTTP Status Codes

| Code | Description |
|--------|------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 500 | Internal Server Error |

---

# Tech Stack

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Socket.IO
- RabbitMQ