import { Server, Namespace } from 'socket.io';

const io = new Server(8900, {
    cors: {
        origin: 'https://xsocial.dev',
    },
});

// Create separate namespaces for chat and notifications
const chatNamespace: Namespace = io.of('/chat');
const notificationNamespace: Namespace = io.of('/notification');

interface User {
    userId: string;
    socketId: string;
}

interface INotification {
    senderId: string;
    receiverId: string;
    count: number;
}

let chatUsers: User[] = [];
let notificationUsers: User[] = [];

const addChatUser = (userId: string, socketId: string) => {
    !chatUsers.some((user) => user.userId === userId) && chatUsers.push({ userId, socketId });
};

const removeChatUser = (socketId: string) => {
    chatUsers = chatUsers.filter((user) => user.socketId !== socketId);
};

const getChatUser = (userId: string) => {
    return chatUsers.find((user) => user.userId === userId);
};

const addNotificationUser = (userId: string, socketId: string) => {
    !notificationUsers.some((user) => user.userId === userId) && notificationUsers.push({ userId, socketId });
};

const removeNotificationUser = (socketId: string) => {
    notificationUsers = notificationUsers.filter((user) => user.socketId !== socketId);
};

const getNotificationUser = (userId: string) => {
    return notificationUsers.find((user) => user.userId === userId);
};

// Handling chat connections
chatNamespace.on('connection', (socket) => {
    console.log('a User connected to chat');

    socket.on('addUser', (userId: string) => {
        addChatUser(userId, socket.id);
        chatNamespace.emit('getUsers', chatUsers);
    });

    socket.on('sendMessage', ({ senderId, receiverId, text }: { senderId: string; receiverId: string; text: string }) => {
        const user = getChatUser(receiverId);

        console.log(senderId, user, text);

        if (user) {
            chatNamespace.to(user.socketId).emit('getMessage', {
                senderId,
                text,
            });
        }
    });

    socket.on('disconnect', () => {
        console.log('a user disconnected from chat');
        removeChatUser(socket.id);
        chatNamespace.emit('getUsers', chatUsers);
    });
});

// Handling notification connections
notificationNamespace.on('connection', (socket) => {
    console.log('a User connected to notifications');

    socket.on('sendNotification', ({ senderId, receiverId, count }: INotification) => {
        const user = getNotificationUser(receiverId);

        if (user) {
            notificationNamespace.to(user.socketId).emit('getNotification', {
                senderId,
                count,
            });
        }
    });

    socket.on('disconnect', () => {
        console.log('a user disconnected from notifications');
        removeNotificationUser(socket.id);
    });
});
