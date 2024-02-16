import { Publisher, Subjects, UserCreatedEvent } from '@scxsocialcommon/event';

export class UserCreatedPublisher extends Publisher<UserCreatedEvent> {
    subject: Subjects.UserCreated = Subjects.UserCreated;
}
