import { NotFoundError, currentUser, errorHandler } from '@scxsocialcommon/errors';
import { app } from './app';
import { connect } from './data/data-source/mongodb/connection';
import { natsWrapper } from '../nats-wrapper';
import { NotificationCreatedListener } from './api/events/sub/notification-created-listener';
import { CreateNotifications } from './domain/usecase/notifications/create-notification.use-case';
import { NotificationRepository } from './domain/repository/notification.repository';
import { NotificationDataSource } from './data/data-source/mongodb/mongodb-notification.data-source';
import NotificationRouter from './api/routes/notification.router';
import { GetAllUserNotifications } from './domain/usecase/notifications/get-all-user-notificatoin.use-case';
import { BatchUpdate } from './domain/usecase/notifications/batch-update.use-case';

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

    if (!process.env.NATS_CLIENT_ID) {
        throw new Error('NATS_CLIENT_ID must be defined');
    }

    if (!process.env.NATS_URL) {
        throw new Error('NATS_URL must be defined');
    }

    if (!process.env.NATS_CLUSTER_ID) {
        throw new Error('NATS_CLUSTER_ID must be defined');
    }

    const notificationMiddleware = NotificationRouter(
        new GetAllUserNotifications(new NotificationRepository(new NotificationDataSource())),
        new BatchUpdate(new NotificationRepository(new NotificationDataSource()))
    );

    app.use(currentUser);

    app.use(notificationMiddleware);

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

        new NotificationCreatedListener(
            natsWrapper.client,
            new CreateNotifications(new NotificationRepository(new NotificationDataSource()))
        ).listen();
    } catch (error) {
        console.log(error);
    }

    app.listen(3000, () => {
        console.log('Notification Server running on port 3000 🚀.');
    });
};

start();
