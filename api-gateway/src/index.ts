import { app } from './app';
import { connect } from './data/data-source/mongo-db/connection';

import UserRouter from './api/routers/user.routes';

import { UserRepositoryImpl } from './domain/repository/user.repository';
import { NotFoundError, errorHandler } from '@scxsocialcommon/errors';
import { CreateUser } from './domain/use-cases/create-user.use-case';
import { GetUser } from './domain/use-cases/get-user.use-case';
import { UpdateUser } from './domain/use-cases/update-user.use-case';

const start = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO URI must be defiend');
    }

    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }

    const datasource = await connect(process.env.MONGO_URI);

    if (!datasource) {
        throw new Error('Error Connecting Database');
    }

    const UserMiddleware = UserRouter(
        new CreateUser(new UserRepositoryImpl(datasource)),
        new GetUser(new UserRepositoryImpl(datasource)),
        new UpdateUser(new UserRepositoryImpl(datasource))
    );

    app.use('/api/users', UserMiddleware);

    app.use(errorHandler);

    app.all('*', async () => {
        throw new NotFoundError();
    });

    app.listen(3000, () => {
        console.log('Auth Server running on port 3000 🚀.');
    });
};

start();
