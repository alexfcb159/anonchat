const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
app.use(cors());
const server = http.createServer(app);
const { Server } = require('socket.io');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
    let userDatabaseId;

    const emitLoggedInUsers = async () => {
        const users = await prisma.user.findMany();
        console.log('All DB users: ', users);
        io.to('Lobby').emit('Logged_in_users', users);
    };

    socket.on('Join_lobby', async (data) => {
        socket.join(data.lobby);

        const user = await prisma.user.create({
            data: {
                name: data.username,
                room: data.lobby
            },
        });

        await emitLoggedInUsers();
        userDatabaseId = user.id;

        console.log('Connected DB user: ', user);
        console.log(`User with ID: ${socket.id} joined room: ${data.lobby}`);
    });

    socket.on('Join_room', (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    socket.on('Send_message', (data) => {
        socket.to('Lobby').emit('Receive_message', data);
    });

    socket.on('disconnect', async () => {
        console.log('User disconnected: ', socket.id);
        await prisma.user.delete({
            where: {
                id: userDatabaseId
            },
        });
        await emitLoggedInUsers();
        console.log('User deleted from DB')
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});