# Chat App
Instant messaging application built using ReactJS and Socket.io

# Features

- ###### Chat message box to list messages
    - User's messages are on right side and other user's messages on left side
    - Each message displays the time and sender's name
    - Group messaging.
    - Send images using URLs (copy and paste image URL and it will be rendered as an image)
- ###### Settings Overlay
    - All the settings are consumed and saved on the LocalStorage.
    - Change clock display radio inputs (User can change the time format eg: 24hr or 12 hr).
    - User can reset all saved settings to default.
    - User can turn on/off send messages using Ctrl + Enter.

# Tech
- ReactJS
- NodeJS
- Socket.io
- Webpack
- Sass

# Installation

Clone the repository and follow the below mentioned steps to setup and run the application.

#### Client
```sh
$ cd chat-app/client
$ sudo npm install
$ npm start
```
#### Server
```sh
$ cd chat-app/server
$ sudo npm install
$ npm start
```

Access the client-side application by navigating to your server address in your preferred browser.

```sh
localhost:8080
```

Verify the server working by navigating to your server address in your browser.

```sh
localhost:3001
```
