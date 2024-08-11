const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000
const http = require('http').createServer(app);

app.use(express.static(__dirname + '/../public'))


http.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})


// connecting io
const io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log('A user connected...');

    //listen for messages from client
    socket.on('message', (msg) => {
        //broadcast the message to all other clients
        socket.broadcast.emit('message', msg);
    })


    socket.on('disconnect', (socket) => {
        console.log('a user disconnected');
    })
})

// api/index.js
export default function handler(req, res) {
    res.status(200).json({ message: 'Hello from serverless function' });
  }
  