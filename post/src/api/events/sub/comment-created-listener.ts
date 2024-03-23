import { Message, Stan } from 'node-nats-streaming';
import { CommentCreatedEvent, Listener, Subjects } from '@scxsocialcommon/event';
import { queueGroupName } from './queueGroupName';
import { AdminUpdatePostUseCase } from '../../../domain/interfaces/use-cases/posts';
import { GetPostByIdUseCase } from '../../../domain/interfaces/use-cases/posts/get-post-by-id.use-case';

export class CommentCreatedListener extends Listener<CommentCreatedEvent> {
    subject: Subjects.CommentCreated = Subjects.CommentCreated;
    queueGroupName: string = queueGroupName;
    getPostByIdUseCase: GetPostByIdUseCase | undefined;
    adminUpdatePostUseCase: AdminUpdatePostUseCase | undefined;

    constructor(client: Stan, adminUpdatePostUseCase: AdminUpdatePostUseCase, getPostByIdUseCase: GetPostByIdUseCase) {
        super(client);
        this.adminUpdatePostUseCase = adminUpdatePostUseCase;
        this.getPostByIdUseCase = getPostByIdUseCase;
    }

    async onMessage(data: CommentCreatedEvent['data'], msg: Message) {
        if (!this.adminUpdatePostUseCase || !this.getPostByIdUseCase) {
            console.error('UpdateUsecase not initialized.');
            msg.ack();
            return;
        }

        try {
            const updatePost = await this.getPostByIdUseCase.execute(data.postId);

            if (updatePost) {
                await this.adminUpdatePostUseCase.execute(data.postId, {
                    comments: [...updatePost.comments, data.commentId],
                });
            }

            msg.ack();
        } catch (error: any) {
            console.error('Error processing UserCreatedEvent:', error.message);
            msg.ack();
        }
    }
}
