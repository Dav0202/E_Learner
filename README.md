# E_Learner
A Website used for creating, delivering, tracking, and reporting educational courses and outcomes to enable distance learning

## Introduction

This project was built by Ezeji Davidson as his portfolio project in his final year at ALX Holberton School. It was designed using **Django framework** to build the backend web application, **MySQL** to store client data and a statically typed frontend using **Angular**. This web application on a server using *Nginx*, *Gunicorn* and *Puppet* manifests for Configuration.

## Description💡

[E Learner Website](http://18.204.11.246/) 

This Project is intended to help students without access or with limited access to a physical classroom for education to get it through distance learning.
The platform manages and stores learning materials electronically. The system helps both students and other users to keep a constant track of all the books and videos available in the system, download or watch/read them online. It also has the facilities to enable teachers give students tests and automatically grade them.

## Tech Stack
![](https://github.com/Dav0202/Elearner_Landing-page/blob/0c249f0e69a9b5cedbfaa4c5cb2dcb170da3c372/images/Data%20flow%20diagram.png)

## Authentication 🔑

E_Learner features a JWT TOKEN authentication process. The process works as follows:

User enters email (for login) or both email + username (for signup). Front-end initially sends email/username to back-end.

If logging in, and an account does not exist with the given email or the password is incorrect, back-end returns an error code, and user is prompted with invalid login credentials.
Otherwise, back-end generates and returns an access token associated with the user and a http only refresh token to refresh the access token if it is expired.
Front-end temporarily stores the access token in localStorage, and returned as a bearer token for authentication

Once the original access token is expired the http only refresh token is automatically used to refresh the expired token and returns a new access token for authentication.

## Features
![](https://github.com/Dav0202/Elearner_Landing-page/blob/main/images/Screenshot%202023-03-11%20224757.png)
![](https://github.com/Dav0202/Elearner_Landing-page/blob/main/images/Screenshot%202023-03-11%20224919.png)
![](https://github.com/Dav0202/Elearner_Landing-page/blob/main/images/Screenshot%202023-03-11%20225026.png)
- Assignment/Test Creation
- Automatic Grading of finished assignment
- Learning Material Upload
- Learning Material Download
- JWT Authentication
- Video Calls and Classroom
- Live Chatroom for all Users


## Authors ✒️
Ezeji Davidson [@Dav0202](https://github.com/Dav0202) 

## Future of E-Learner
- [ ] Educational Games
- [ ] Intergration with Youtube API

If you have any good ideas for features or deployment ideas, please contact me through Gmail.