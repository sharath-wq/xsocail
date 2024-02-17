import { app } from './app';
import { connect } from './data/data-source/mongodb/connection';

import UserRouter from './api/routes/user.routes';
import { CreateUser, DeleteUser, GetAllUsers, GetUser, Login, Logout, UpdateUser } from './domain/use-cases/user/index';
import { UserRepositoryImpl } from './domain/repository/user.repository';
import { NotFoundError, currentUser, errorHandler } from '@scxsocialcommon/errors';
import { natsWrapper } from '../nats-wrapper';
import { TokenRepositoryImpl } from './domain/repository/token.repository';
import { MongoDBTokenDataSource } from './data/data-source/mongodb/mongodb-token-datasource';
import { SendResetToken } from './domain/use-cases/token/send-reset-token.use-case';
import { ResetPassword } from './domain/use-cases/token/reset-password.use-case';

const start = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO URI must be defiend');
    }

    const datasource = await connect(process.env.MONGO_URI);

    if (!datasource) {
        throw new Error('Error Connecting Database');
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

    const UserMiddleware = UserRouter(
        new CreateUser(new UserRepositoryImpl(datasource)),
        new DeleteUser(new UserRepositoryImpl(datasource)),
        new GetAllUsers(new UserRepositoryImpl(datasource)),
        new GetUser(new UserRepositoryImpl(datasource)),
        new UpdateUser(new UserRepositoryImpl(datasource)),
        new Login(new UserRepositoryImpl(datasource)),
        new Logout(),
        new SendResetToken(new TokenRepositoryImpl(new MongoDBTokenDataSource()), new UserRepositoryImpl(datasource)),
        new ResetPassword(new TokenRepositoryImpl(new MongoDBTokenDataSource()), new UserRepositoryImpl(datasource))
    );

    app.use(currentUser);

    app.use(UserMiddleware);

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
    } catch (error) {
        console.log(error);
    }

    app.listen(3000, () => {
        console.log('User Server running on port 3000 🚀');
    });
};

start();
