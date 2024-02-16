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
import { UserUpdatedListener } from './api/events/user-updated-listener';
import PostRouter from './api/routes/post.router';

import { createProxyMiddleware } from 'http-proxy-middleware';
import { POST_SERVICE_ENDPOINT } from './constants/endpoints';
import { GetByUsername } from './domain/use-cases/get-by-user-name.use-case';
import { GetUserByEmail } from './domain/use-cases/get-user-by-email.use-case';

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

    const PostMiddleware = PostRouter();

    app.use(currentUser);

    app.use('/api/users/', UserMiddleware);

    app.use(
        '/api/posts',
        requireAuth,
        createProxyMiddleware({
            target: POST_SERVICE_ENDPOINT,
            changeOrigin: true,
            pathRewrite: { '^/api/posts': '/' },
        })
    );

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
        new UserUpdatedListener(natsWrapper.client, new UpdateUser(new UserRepositoryImpl(datasource))).listen;
    } catch (error) {
        console.log(error);
    }

    app.listen(3000, () => {
        console.log('Auth Server running on port 3000 🚀');
    });
};

start();
