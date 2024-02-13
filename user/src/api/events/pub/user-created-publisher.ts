import { Publisher, Subjects, UserUpdatedEvent } from '@scxsocialcommon/event';

export class UserUpdatedPubliser extends Publisher<UserUpdatedEvent> {
    subject: Subjects.UserUpdated = Subjects.UserUpdated;
}
