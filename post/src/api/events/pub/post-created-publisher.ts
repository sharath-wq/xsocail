import { Publisher, Subjects, PostCreatedEvent } from '@scxsocialcommon/event';

export class PostCreatedPublisher extends Publisher<PostCreatedEvent> {
    subject: Subjects.PostCreated = Subjects.PostCreated;
}
