const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
//creating express instance
const app = express();
//creating http server
const server = http.createServer(app);
//creating socketio instance
const io = new Server(server);
const ACTIONS = require('./src/Actions');
const PORT = process.env.PORT || 5000;

const userSocketMap = {};

function getAllConnectedClients(roomId) {
    // Map
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
        (socketId) => {
            return {
                socketId,
                username: userSocketMap[socketId],
            };
        }
    );
}

io.on('connection',(socket)=>{
    console.log(`socket connection successfull`,socket.id);
    socket.on(ACTIONS.JOIN,({ roomId,username })=>{
        userSocketMap[socket.id] = username;
        socket.join(roomId)
        const clients = getAllConnectedClients(roomId);
        console.log(clients);
        clients.forEach(({ socketId })=>{
            io.to(socketId).emit(ACTIONS.JOINED,{
                username,
                clients,
                socketId:socket.id
            })
        })
    })
})

server.listen(PORT,()=>{
    console.log(`server started at PORT:${PORT}`);
})