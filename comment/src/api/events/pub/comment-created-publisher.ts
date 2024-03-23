import { Publisher, CommentCreatedEvent, Subjects } from '@scxsocialcommon/event';

export class CommentCreatedPublisher extends Publisher<CommentCreatedEvent> {
    subject: Subjects.CommentCreated = Subjects.CommentCreated;
}
