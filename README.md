# Vonder-Internship
For vonder internship assignment


# User API
### http://localhost:{PORT}/api/users

### POST /register
<pre>
Request Body
{
    "username" : "tester",
    "email" : "tester@email.com",
    "password" : "123456"
}

Response 
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
<pre>
Request Body
{
    "identifier":"tester",
    "password":"123456"
}

Response
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
### http://localhost:{port}/api/rooms

### POST /create
<pre>
Request Body
{
    "name" : "Room7",
    "capacity" : "77"
}

Response
Status 201 Created
{
    "message": "Room Created",
    "room": {
        "name": "Room7",
        "capacity": "77",
        "reserveDate": [],
        "_id": "6481d12a4d3ea04bde196851",
        "roomId": 7,
        "__v": 0
    }
}
</pre>
### GET /show
<pre>
Response
Status 200 OK
[
    {
        "_id": "64816db9b61a279d253c6020",
        "name": "Room1",
        "capacity": "15",
        "reserveDate": [
            [
                "2023-06-08T10:30:00.000Z",
                "2023-06-08T10:31:00.000Z"
            ],
            [
                "2023-06-08T11:00:00.000Z",
                "2023-06-08T11:30:00.000Z"
            ]
        ],
        "roomId": 1,
        "__v": 26
    }, ....
]
</pre>
### GET /:id
<pre>
Resposne 200 OK
{
    "_id": "64816db9b61a279d253c6020",
    "name": "Room1",
    "capacity": "15",
    "reserveDate": [
        [
            "2023-06-08T10:30:00.000Z",
            "2023-06-08T10:31:00.000Z"
        ],
        [
            "2023-06-08T11:00:00.000Z",
            "2023-06-08T11:30:00.000Z"
        ]
    ],
    "roomId": 1,
    "__v": 26
}
</pre>
### GET /name/:name
<pre>
Response 200 OK
{
    "_id": "64816db9b61a279d253c6020",
    "name": "Room1",
    "capacity": "15",
    "reserveDate": [
        [
            "2023-06-08T10:30:00.000Z",
            "2023-06-08T10:31:00.000Z"
        ],
        [
            "2023-06-08T11:00:00.000Z",
            "2023-06-08T11:30:00.000Z"
        ]
    ],
    "roomId": 1,
    "__v": 26
}
</pre>
### POST /check
<pre>
Request Body
{
    "identifier" : "1",
    "start" : "08/06/23 20:00",
    "end" : "08/06/23 21:00"
}

Response
Status 200 Ok
This room is available during the specified time.
</pre>
### POST /reserve
<pre>
Request Body
{
    "identifier" : "7",
    "start" : "08/06/23 10:00",
    "end" : "08/06/23 11:30"
}

Response
Status 200 Ok
{
    "_id": "6481d12a4d3ea04bde196851",
    "name": "Room7",
    "capacity": "77",
    "reserveDate": [
        [
            "2023-06-08T03:00:00.000Z",
            "2023-06-08T04:30:00.000Z"
        ]
    ],
    "roomId": 7,
    "__v": 1
}
</pre>
### POST /cancel
<pre>
Request Body
{
    "identifier" : "7",
    "start" : "08/06/23 10:00"
}

Resposne
Status 200 OK
{
    "message": "Cancel successfully",
    "room": {
        "_id": "6481d12a4d3ea04bde196851",
        "name": "Room7",
        "capacity": "77",
        "reserveDate": [],
        "roomId": 7,
        "__v": 2
    }
}
</pre>
