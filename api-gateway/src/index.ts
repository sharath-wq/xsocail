import { NotFoundError, currentUser, errorHandler, requireAuth } from '@scxsocialcommon/errors';
import { app } from './app';
import { connect } from './data/data-source/mongodb/connection';
import UserRouter from './api/routes/user.router';
import { CreateUser } from './domain/use-cases/create-user.use-case';
import { UserRepositoryImpl } from './domain/repository/user.repository';
import { GetUser } from './domain/use-cases/get-user.use-case';
import { UpdateUser } from './domain/use-cases/update-user.use-case';
import { natsWrapper } from './nats-wrapper';
import { UserCreatedListener } from './api/events/user-created-listener';

import { createProxyMiddleware } from 'http-proxy-middleware';
import { CHAT_SERVICE_ENDPOINT, POST_SERVICE_ENDPOINT, USER_SERVICE_ENDPOINT } from './constants/endpoints';
import { GetByUsername } from './domain/use-cases/get-by-user-name.use-case';
import { GetUserByEmail } from './domain/use-cases/get-user-by-email.use-case';
import { UserUpdatedListener } from './api/events/user-updated-listener';
import CommentRouter from './api/routes/comment.router';
import { ChatController } from './api/controllers/chat.controller';
import ChatRouter from './api/routes/chat.router';
import NotificationRouter from './api/routes/notifications.router';
import PostRouter from './api/routes/post.router';

const start = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO URI must be defiend');
    }

    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }

    if (!process.env.NATS_CLIENT_ID) {
        throw new Error('NATS_CLIENT_ID must be defined');
    }

    if (!process.env.NATS_URL) {
        throw new Error('NATS_URL must be defined');
    }

    if (!process.env.NATS_CLUSTER_ID) {
        throw new Error('NATS_CLUSTER_ID must be defined');
    }

    const datasource = await connect(process.env.MONGO_URI);

    if (!datasource) {
        throw new Error('Error Connecting Database');
    }

    const UserMiddleware = UserRouter(
        new CreateUser(new UserRepositoryImpl(datasource)),
        new GetUser(new UserRepositoryImpl(datasource)),
        new UpdateUser(new UserRepositoryImpl(datasource)),
        new GetByUsername(new UserRepositoryImpl(datasource)),
        new GetUserByEmail(new UserRepositoryImpl(datasource))
    );

    const CommentMiddleware = CommentRouter(new GetUser(new UserRepositoryImpl(datasource)));
    const ChatMiddleware = ChatRouter();
    const NotificationMiddleware = NotificationRouter();
    const PostMiddleware = PostRouter();

    app.use(currentUser);

    app.use(
        '/api/users/image',
        createProxyMiddleware({
            target: USER_SERVICE_ENDPOINT,
            changeOrigin: true,
            pathRewrite: { '^/api/users/': '/' },
        })
    );

    app.use('/api/users/', UserMiddleware);
    app.use('/api/comments/', CommentMiddleware);
    app.use('/api/chat', ChatMiddleware);
    app.use('/api/notifications', NotificationMiddleware);
    app.use('/api/posts', PostMiddleware);

    // app.use(
    //     '/api/posts',
    //     requireAuth,
    //     createProxyMiddleware({
    //         target: POST_SERVICE_ENDPOINT,
    //         changeOrigin: true,
    //         pathRewrite: { '^/api/posts': '/' },
    //     })
    // );

    app.use(errorHandler);

    app.all('*', async () => {
        throw new NotFoundError();
    });

    try {
        await natsWrapper.connect(process.env.NATS_CLUSTER_ID, process.env.NATS_CLIENT_ID, process.env.NATS_URL);

        natsWrapper.client.on('close', () => {
            console.log('NATS connection closed!');
            process.exit();
        });
        process.on('SIGINT', () => natsWrapper.client.close());
        process.on('SIGTERM', () => natsWrapper.client.close());

        new UserCreatedListener(natsWrapper.client, new CreateUser(new UserRepositoryImpl(datasource))).listen();

        new UserUpdatedListener(natsWrapper.client, new UpdateUser(new UserRepositoryImpl(datasource))).listen();
    } catch (error) {
        console.log(error);
    }

    app.listen(3000, () => {
        console.log('Auth Server running on port 3000 🚀');
    });
};

start();
