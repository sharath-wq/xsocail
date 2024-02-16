import { Publisher, Subjects, UserCreatedEvent, UserUpdatedEvent } from '@scxsocialcommon/event';

export class UserUpdatedPubliser extends Publisher<UserUpdatedEvent> {
    subject: Subjects.UserUpdated = Subjects.UserUpdated;
}
