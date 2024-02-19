import { Publisher, Subjects, PostCreatedEvent, PostDeletedEvent } from '@scxsocialcommon/event';

export class PostDeletedPublisher extends Publisher<PostDeletedEvent> {
    subject: Subjects.PostDeleted = Subjects.PostDeleted;
}
