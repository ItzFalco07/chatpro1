const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname + '/../public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/../public/index.html');
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
