import { app } from './app';
import { connect } from './data/data-source/mongodb/connection';

import UserRouter from './api/routes/user.routes';
import { CreateUser, DeleteUser, GetAllUsers, GetUser, Login, UpdateUser } from './domain/use-cases/user/index';
import { UserRepositoryImpl } from './domain/repository/user.repository';
import { errorHandler } from '@scxsocialcommon/errors';

const start = async () => {
    const datasource = await connect('mongodb://localhost:27017/xsocial');

    if (!datasource) {
        throw new Error('Error Connecting Database');
    }

    const UserMiddleware = UserRouter(
        new CreateUser(new UserRepositoryImpl(datasource)),
        new DeleteUser(new UserRepositoryImpl(datasource)),
        new GetAllUsers(new UserRepositoryImpl(datasource)),
        new GetUser(new UserRepositoryImpl(datasource)),
        new UpdateUser(new UserRepositoryImpl(datasource)),
        new Login(new UserRepositoryImpl(datasource))
    );

    app.use('/users', UserMiddleware);

    app.use(errorHandler);

    app.listen(3000, () => {
        console.log('Auth Server running on port 3000 🚀');
    });
};

start();
