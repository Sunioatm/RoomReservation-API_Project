# Internship assignment
For vonder internship assignment
To show about backend API project by using expressjs

# Run in local
<pre>
    npm install
    npm run server
</pre>

# User API 
### https://backend-room-reservation-api.onrender.com/api/users
##### (backup link) https://backend-room-reservation-api-mft7.onrender.com/api/users

### POST /register
#### Request Body
<pre>
{
    "username" : "tester",
    "email" : "tester@email.com",
    "password" : "123456"
}
</pre>
#### Response 
<pre>
Status 201 Created
{
    "username": "tester",
    "email": "tester@email.com",
    "password": "$2a$10$4V0HYFuASQrgW2cJJ7iwa.Ua3Hzp94.cLu89WdjmsQ0IMGYvwTmfy",
    "_id": "6481cfb04d3ea04bde19684d",
    "__v": 0
}
</pre>
### POST /login

#### Request Body
<pre>
{
    "identifier":"tester",
    "password":"123456"
}
</pre>
#### Response
<pre>
Status 200 OK
{
    "_id": "6481772bcc1c8fc63823ce76",
    "username": "tester",
    "email": "tester@email.com",
    "password": "$2a$10$Huah7JSxQQup3q1We4dk8u.BpD2YBgP0mBaJlMdewwSXmqIgX8032",
    "__v": 0,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ4MTc3MmJjYzFjOGZjNjM4MjNjZTc2IiwiZW1haWwiOiJ0ZXN0ZXJAZW1haWwuY29tIiwiaWF0IjoxNjg2MjI5MjIzLCJleHAiOjE2ODYyMzY0MjN9.sNPzhDbfzNy2vLG3YDZ5k9EUDIXKbaZpsAXqNT1Z9rc"
}
</pre>

# Room API
### https://backend-room-reservation-api.onrender.com/api/rooms
##### (backup link) https://backend-room-reservation-api-mft7.onrender.com/api/rooms

### POST /create
#### Request Body
<pre>
{
    "name" : "Room7",
    "capacity" : "777"
}
</pre>
#### Response
<pre>
{
    "message": "Room Created",
    "room": {
        "name": "Room7",
        "capacity": "777",
        "_id": "64825047e06e42f8df258927",
        "reserveDateTime": [],
        "roomId": 7,
        "__v": 0
    }
}
</pre>
### GET /show
#### Response
<pre>
Status 200 OK
[
    {
        "_id": "648234abf72614d317ec48d3",
        "name": "Room1",
        "capacity": "15",
        "reserveDateTime": [
            {
                "start": "2023-06-09T03:00:00.000Z",
                "end": "2023-06-09T04:00:00.000Z",
                "_id": "64824511001bfe27241377e6"
            },
            {
                "start": "2023-06-09T05:00:00.000Z",
                "end": "2023-06-09T06:00:00.000Z",
                "_id": "6482451d001bfe27241377ea"
            }
        ],
        "roomId": 1,
        "__v": 43
    }, ...
]
</pre>
### GET /:id
#### Resposne
<pre>
Status 200 OK
{
    "_id": "648234abf72614d317ec48d3",
    "name": "Room1",
    "capacity": "15",
    "reserveDateTime": [
        {
            "start": "2023-06-09T03:00:00.000Z",
            "end": "2023-06-09T04:00:00.000Z",
            "_id": "64824511001bfe27241377e6"
        },
        {
            "start": "2023-06-09T05:00:00.000Z",
            "end": "2023-06-09T06:00:00.000Z",
            "_id": "6482451d001bfe27241377ea"
        }
    ],
    "roomId": 1,
    "__v": 43
}
</pre>
### GET /name/:name
#### Response 
<pre>
Status 200 OK
{
    "_id": "648234abf72614d317ec48d3",
    "name": "Room1",
    "capacity": "15",
    "reserveDateTime": [
        {
            "start": "2023-06-09T03:00:00.000Z",
            "end": "2023-06-09T04:00:00.000Z",
            "_id": "64824511001bfe27241377e6"
        },
        {
            "start": "2023-06-09T05:00:00.000Z",
            "end": "2023-06-09T06:00:00.000Z",
            "_id": "6482451d001bfe27241377ea"
        }
    ],
    "roomId": 1,
    "__v": 43
}
</pre>
### POST /check
#### Request Body
<pre>
{
    "identifier" : "1",
    "start" : "08/06/23 20:00",
    "end" : "08/06/23 21:00"
}
</pre>
#### Response
<pre>
Status 200 Ok
This room is available during the specified time.
</pre>
### POST /reserve
#### Request Body
<pre>
{
    "identifier" : "7",
    "start" : "09/06/23 11:00",
    "end" : "09/06/23 12:00"
}
</pre>
#### Response
<pre>
Status 200 Ok
{
    "_id": "64825047e06e42f8df258927",
    "name": "Room7",
    "capacity": "777",
    "reserveDateTime": [
        {
            "start": "2023-06-09T04:00:00.000Z",
            "end": "2023-06-09T05:00:00.000Z",
            "_id": "64825162e06e42f8df258972"
        }
    ],
    "roomId": 7,
    "__v": 1
}
</pre>
### POST /cancel
#### Request Body
<pre>
{
    "identifier" : "7",
    "start" : "09/06/23 11:00"
}
</pre>
#### Resposne
<pre>
Status 200 OK
{
    "message": "Cancel successfully",
    "room": {
        "_id": "64825047e06e42f8df258927",
        "name": "Room7",
        "capacity": "777",
        "reserveDateTime": [],
        "roomId": 7,
        "__v": 2
    }
}
</pre>
