const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);
let count = 0;
app.use(express.static(__dirname + '/../public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/../public/index.html');
});

io.on('connection', (socket) => {
    console.log('A user connected');
    count+= 1;
    io.emit('updateCount', count);
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
        count-=1;
        io.emit('updateCount', count);
    });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
