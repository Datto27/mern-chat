# MERN STACK chat application with different rooms.

Used Tools:

<img src="https://img.shields.io/badge/react-%2361DAFB.svg?&style=for-the-badge&logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/material--ui-%230081CB.svg?&style=for-the-badge&logo=material-ui&logoColor=white" />
<img src="https://img.shields.io/badge/node.js-%23339933.svg?&style=for-the-badge&logo=node.js&logoColor=white" />
<img src="https://img.shields.io/badge/express-%23000000.svg?&style=for-the-badge&logo=express&logoColor=white" />
<img src="https://img.shields.io/badge/oAuth-%23000000.svg?&style=for-the-badge&logo=oAuth&logoColor=white" />
<img src="https://img.shields.io/badge/Pusher-%230000FF.svg?&style=for-the-badge&logoColor=white" />

Not added room joining functional.

Here is used pusher api for reflect on the front as soon as data changes in db....
For Authentication here is used google api and users can sign in chat with their gmails

connect your mongodb atlas into /server/index.js

# SERVER:
# Authetication: 

  for auth documentation visit this page:
  
  https://www.passportjs.org/packages/passport-google-oauth20/
  for make google authentication, you need to create google developer account and add new credentials. follow link down below
  
  https://console.cloud.google.com/apis/credentials/oauthclient
  
  crete .env file and add your 
  GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET 
  from your credentials/oauthclient
  
  ! for Authorized redirect URIs you must set:
  http://localhost:4000/auth/google/callback

PUSHER IS USED FOR SHOW NEW DATA CHANGES IN FRONTEND.

  for use it you need to add PUSHER_ID and PUSHER_KEY in .env from your pusher api

# UI : 

  theme controlls inside index.css
