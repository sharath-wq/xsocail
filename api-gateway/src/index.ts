import { app } from './app';
import { connect } from './data/data-source/mongo-db/connection';

import UserRouter from './api/routers/user.routes';

import { UserRepositoryImpl } from './domain/repository/user.repository';
import { NotFoundError, errorHandler } from '@scxsocialcommon/errors';

const start = async () => {
    const datasource = await connect('mongodb://localhost:27017/xsocial');

    if (!datasource) {
        throw new Error('Error Connecting Database');
    }

    app.use('/users', UserRouter());

    app.use(errorHandler);

    app.all('*', async () => {
        throw new NotFoundError();
    });

    app.listen(3000, () => {
        console.log('Auth Server running on port 3000 🚀');
    });
};

start();
