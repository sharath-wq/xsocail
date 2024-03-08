import { Server } from 'socket.io';

const io = new Server(8900, {
    cors: {
        origin: 'https://xsocial.dev',
    },
});

interface User {
    userId: string;
    socketId: string;
}

let users: User[] = [];

const addUser = (userId: string, socketId: string) => {
    !users.some((user) => user.userId === userId) && users.push({ userId, socketId });
};

const removeUser = (socketId: string) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId: string) => {
    return users.find((user) => user.userId === userId);
};

io.on('connection', (socket) => {
    console.log('a User connected');
    socket.on('addUser', (userId: string) => {
        addUser(userId, socket.id);
        io.emit('getUsers', users);
    });

    socket.on('sendMessage', ({ senderId, receiverId, text }: { senderId: string; receiverId: string; text: string }) => {
        const user = getUser(receiverId);
        if (user) {
            io.to(user.socketId).emit('getMessage', {
                senderId,
                text,
            });
        }
    });

    socket.on('disconnect', () => {
        console.log('a user disconnected');
        removeUser(socket.id);
        io.emit('getUsers', users);
    });
});
