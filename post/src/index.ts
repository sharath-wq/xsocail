import { NotFoundError, currentUser, errorHandler } from '@scxsocialcommon/errors';
import { app } from './app';
import { connect } from './data/data-source/mongodb/connection';
import PostRouter from './api/routes/post.routes';
import { PostRepositoryImpl } from './domain/repository/post.repository';
import { natsWrapper } from '../nats-wrapper';
import {
    AdminUpdatePost,
    CreatePost,
    DeletePost,
    DisLikePost,
    GetAllPosts,
    GetBatchPost,
    GetOnePost,
    GetPopularPosts,
    GetSavedPosts,
    GetUserFeedPosts,
    GetUserPosts,
    LikePost,
    UpdatePost,
    UpdatePostsByUserId,
} from './domain/use-cases/post';
import { UserUpdatedListener } from './api/events/sub/user-updated-listener';
import ReportRouter from './api/routes/report.routes';
import { CreateReport, GetAllReport, GetOneReport, UpdateReport } from './domain/use-cases/report';
import { ReportRepository } from './domain/repository/report.repository';
import { MongoDBReportDataSource } from './data/data-source/mongodb/mongodb-report-datasource';
import { CommentCreatedListener } from './api/events/sub/comment-created-listener';
import { GetPostById } from './domain/use-cases/post/get-post-by-id.use-case';

const start = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO URI must be defiend');
    }

    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }

    const datasource = await connect(process.env.MONGO_URI);

    if (!datasource) {
        throw new Error('Error Connecting to Database');
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

    const PostMiddleware = PostRouter(
        new CreatePost(new PostRepositoryImpl(datasource)),
        new DeletePost(new PostRepositoryImpl(datasource)),
        new GetAllPosts(new PostRepositoryImpl(datasource)),
        new GetOnePost(new PostRepositoryImpl(datasource)),
        new UpdatePost(new PostRepositoryImpl(datasource)),
        new GetUserPosts(new PostRepositoryImpl(datasource)),
        new LikePost(new PostRepositoryImpl(datasource)),
        new DisLikePost(new PostRepositoryImpl(datasource)),
        new GetUserFeedPosts(new PostRepositoryImpl(datasource)),
        new GetSavedPosts(new PostRepositoryImpl(datasource)),
        new GetBatchPost(new PostRepositoryImpl(datasource)),
        new AdminUpdatePost(new PostRepositoryImpl(datasource)),
        new GetPopularPosts(new PostRepositoryImpl(datasource))
    );

    const ReportMiddleware = ReportRouter(
        new CreateReport(new ReportRepository(new MongoDBReportDataSource()), new PostRepositoryImpl(datasource)),
        new GetAllReport(new ReportRepository(new MongoDBReportDataSource())),
        new GetOneReport(new ReportRepository(new MongoDBReportDataSource())),
        new UpdateReport(new ReportRepository(new MongoDBReportDataSource()), new PostRepositoryImpl(datasource))
    );

    app.use(currentUser);

    app.use('/reports', ReportMiddleware);

    app.use(PostMiddleware);

    app.use(errorHandler);

    app.all('*', async (req, res, next) => {
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

        new UserUpdatedListener(natsWrapper.client, new UpdatePostsByUserId(new PostRepositoryImpl(datasource))).listen();

        new CommentCreatedListener(
            natsWrapper.client,
            new AdminUpdatePost(new PostRepositoryImpl(datasource)),
            new GetPostById(new PostRepositoryImpl(datasource))
        ).listen();
    } catch (error) {
        console.log(error);
    }

    app.listen(3000, () => {
        console.log('Auth Server running on port 3000 🚀.');
    });
};

start();
