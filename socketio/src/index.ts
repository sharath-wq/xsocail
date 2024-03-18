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

interface INotificationUser {
    userId: string;
    socketId: string;
    count: number;
}

interface INotification {
    senderId: string;
    receiverId: string;
    count: number;
}

let chatUsers: User[] = [];
let notificationUsers: INotificationUser[] = [];

const addChatUser = (userId: string, socketId: string) => {
    !chatUsers.some((user) => user.userId === userId) && chatUsers.push({ userId, socketId });
};

const removeChatUser = (socketId: string) => {
    chatUsers = chatUsers.filter((user) => user.socketId !== socketId);
};

const getChatUser = (userId: string) => {
    return chatUsers.find((user) => user.userId === userId);
};

const addNotificationUser = (userId: string, socketId: string, count: number) => {
    !notificationUsers.some((user) => user.userId === userId) && notificationUsers.push({ userId, socketId, count });
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

    socket.on(
        'sendMessage',
        ({
            senderId,
            receiverId,
            text,
            imageUrl,
            conversationId,
        }: {
            senderId: string;
            receiverId: string;
            text: string;
            imageUrl: string;
            conversationId: string;
        }) => {
            const user = getChatUser(receiverId);

            if (user) {
                chatNamespace.to(user.socketId).emit('getMessage', {
                    senderId,
                    text,
                    conversationId,
                    imageUrl,
                });
            }
        }
    );

    socket.on('disconnect', () => {
        console.log('a user disconnected from chat');
        removeChatUser(socket.id);
        chatNamespace.emit('getUsers', chatUsers);
    });
});

// Handling notification connections
notificationNamespace.on('connection', (socket) => {
    console.log('a User connected to notifications');

    socket.on('addUser', (userId: string) => {
        addNotificationUser(userId, socket.id, 0);
    });

    socket.on('sendNotification', ({ senderId, receiverId }: INotification) => {
        const user = getNotificationUser(receiverId);
        if (user) {
            user.count += 1;
            notificationNamespace.to(user.socketId).emit('getNotification', {
                senderId,
                count: user.count,
            });
        }
    });

    socket.on('disconnect', () => {
        console.log('a user disconnected from notifications');
        removeNotificationUser(socket.id);
    });
});
