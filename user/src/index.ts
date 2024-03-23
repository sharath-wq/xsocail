import { app } from './app';
import { connect } from './data/data-source/mongodb/connection';

import UserRouter from './api/routes/user.routes';
import {
    AddPost,
    BlockUser,
    CreateUser,
    DeletePost,
    DeleteUser,
    GetAllUsers,
    GetUser,
    GetUserFollowers,
    GetUserFollowing,
    GetUserFriends,
    Login,
    ResetPassword,
    SavePost,
    SendResetToken,
    SendVerificationOtp,
    UnblockUser,
    UnsavePost,
    UpdateUser,
    UpdateUserProfile,
    VerifyUserEmail,
} from './domain/use-cases/user/index';
import { UserRepositoryImpl } from './domain/repository/user.repository';
import { NotFoundError, currentUser, errorHandler } from '@scxsocialcommon/errors';
import { natsWrapper } from '../nats-wrapper';
import { TokenRepositoryImpl } from './domain/repository/token.repository';
import { MongoDBTokenDataSource } from './data/data-source/mongodb/mongodb-token-datasource';
import { PostCreatedListener } from './api/events/sub/post-created-listener';
import { PostDeletedListener } from './api/events/sub/post-deleted-listener';
import { MongoDBUserDataSource } from './data/data-source/mongodb/mongodb-user-datasource';
import { OtpReposiotryImpl } from './domain/repository/otp.repository';
import { MongoDBOtpDatasource } from './data/data-source/mongodb/mongodb-otp-datasource';
import { FollowUser } from './domain/use-cases/user/follow-user.use-case';
import { UnfollowUser } from './domain/use-cases/user/unfollow-user.use-case';
import { GetUserBatch } from './domain/use-cases/user/get-user-batch.use-case';
import ReportRouter from './api/routes/report.routes';
import { CreateReport, GetAllReports, GetOneReport, UpdateReport } from './domain/use-cases/report';
import { ReportRepository } from './domain/repository/report.repository';
import { MongoDBReportDatasource } from './data/data-source/mongodb/mongodb-report-data-source';

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
        new SendResetToken(new TokenRepositoryImpl(new MongoDBTokenDataSource()), new UserRepositoryImpl(datasource)),
        new ResetPassword(new TokenRepositoryImpl(new MongoDBTokenDataSource()), new UserRepositoryImpl(datasource)),
        new UpdateUserProfile(new UserRepositoryImpl(datasource)),
        new SendVerificationOtp(new UserRepositoryImpl(datasource), new OtpReposiotryImpl(new MongoDBOtpDatasource())),
        new VerifyUserEmail(new UserRepositoryImpl(datasource), new OtpReposiotryImpl(new MongoDBOtpDatasource())),
        new BlockUser(new UserRepositoryImpl(datasource)),
        new UnblockUser(new UserRepositoryImpl(datasource)),
        new SavePost(new UserRepositoryImpl(datasource)),
        new UnsavePost(new UserRepositoryImpl(datasource)),
        new FollowUser(new UserRepositoryImpl(datasource)),
        new UnfollowUser(new UserRepositoryImpl(datasource)),
        new GetUserFriends(new UserRepositoryImpl(datasource)),
        new GetUserBatch(new UserRepositoryImpl(datasource)),
        new GetUserFollowing(new UserRepositoryImpl(datasource)),
        new GetUserFollowers(new UserRepositoryImpl(datasource))
    );

    const ReportMiddleware = ReportRouter(
        new CreateReport(new ReportRepository(new MongoDBReportDatasource()), new UserRepositoryImpl(datasource)),
        new GetAllReports(new ReportRepository(new MongoDBReportDatasource())),
        new GetOneReport(new ReportRepository(new MongoDBReportDatasource())),
        new UpdateReport(new ReportRepository(new MongoDBReportDatasource()), new UserRepositoryImpl(datasource))
    );

    app.use(currentUser);

    app.use('/reports', ReportMiddleware);

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

        new PostCreatedListener(natsWrapper.client, new AddPost(new UserRepositoryImpl(datasource))).listen();

        new PostDeletedListener(natsWrapper.client, new DeletePost(new UserRepositoryImpl(datasource))).listen();
    } catch (error) {
        console.log(error);
    }

    app.listen(3000, () => {
        console.log('User Server running on port 3000 🚀');
    });
};

start();
