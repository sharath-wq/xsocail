import { NotFoundError, currentUser, errorHandler } from '@scxsocialcommon/errors';
import { app } from './app';
import { connect } from './data/data-source/mongodb/connection';
import { natsWrapper } from '../nats-wrapper';
import ConversationRouter from './api/routes/conversation.routes';
import { CreateConversation, GetBySenderAndReceiverId, GetByUserId } from './domain/use-case/conversations';
import { ConversationReposity } from './domain/repository/conversation.repository';
import { MongoDBConversationDataSource } from './data/data-source/mongodb/monogdb-conversation-data-source';
import MessageRouter from './api/routes/message.routes';
import { CreateMessage, FindAllMessageByConversationId } from './domain/use-case/messages';
import { MessageRepository } from './domain/repository/message.repository';
import { MongoDBMessageDataSource } from './data/data-source/mongodb/mongodb-message-data-source';

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

    const ConversationMiddleware = ConversationRouter(
        new CreateConversation(new ConversationReposity(new MongoDBConversationDataSource())),
        new GetBySenderAndReceiverId(new ConversationReposity(new MongoDBConversationDataSource())),
        new GetByUserId(new ConversationReposity(new MongoDBConversationDataSource()))
    );

    const MessageMiddleware = MessageRouter(
        new CreateMessage(new MessageRepository(new MongoDBMessageDataSource())),
        new FindAllMessageByConversationId(new MessageRepository(new MongoDBMessageDataSource()))
    );

    app.use('/conversation', ConversationMiddleware);
    app.use('/message', MessageMiddleware);

    app.use(currentUser);

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
        console.log('Auth Server running on port 3000 🚀');
    });
};

start();
