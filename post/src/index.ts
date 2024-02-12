import { NotFoundError, currentUser, errorHandler, requireAuth } from '@scxsocialcommon/errors';
import { app } from './app';
import { connect } from './data/data-source/mongodb/connection';
import PostRouter from './api/routes/post.routes';
import { CreatePost } from './domain/use-cases/post/create-post.use-case';
import { PostRepositoryImpl } from './domain/repository/post.repository';
import { DeletePost } from './domain/use-cases/post/delete-post.use-case';
import { GetAllPosts } from './domain/use-cases/post/get-all-posts.use-case';
import { GetOnePost } from './domain/use-cases/post/get-one-post.use-case';
import { UpdatePost } from './domain/use-cases/post/update-post.use-case';
import { GetUserPosts } from './domain/use-cases/post/get-user-post.use-case';

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

    const PostMiddleware = PostRouter(
        new CreatePost(new PostRepositoryImpl(datasource)),
        new DeletePost(new PostRepositoryImpl(datasource)),
        new GetAllPosts(new PostRepositoryImpl(datasource)),
        new GetOnePost(new PostRepositoryImpl(datasource)),
        new UpdatePost(new PostRepositoryImpl(datasource)),
        new GetUserPosts(new PostRepositoryImpl(datasource))
    );

    app.use(currentUser);

    app.use('/api/posts', requireAuth, PostMiddleware);

    app.use(errorHandler);

    app.all('*', async () => {
        throw new NotFoundError();
    });

    app.listen(3000, () => {
        console.log('Auth Server running on port 3000 🚀');
    });
};

start();
