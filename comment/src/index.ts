import { NotFoundError, currentUser, errorHandler, requireAuth } from '@scxsocialcommon/errors';
import { app } from './app';
import { connect } from './data/data-source/mongodb/connection';
import { natsWrapper } from '../nats-wrapper';
import CommentRouter from './api/routes/comment.router';
import { CreateComment, DeleteComment, GetByPostId } from './domain/use-case/comment';
import { CommentRepository } from './domain/repository/post.repository';

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

    const CommentMiddleware = CommentRouter(
        new CreateComment(new CommentRepository(datasource)),
        new DeleteComment(new CommentRepository(datasource)),
        new GetByPostId(new CommentRepository(datasource))
    );

    app.use(currentUser);

    app.use(CommentMiddleware);

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
        console.log('Comment Server running on port 3000 🚀');
    });
};

start();
