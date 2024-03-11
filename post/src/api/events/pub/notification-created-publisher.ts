import { Publisher, Subjects, PostCreatedEvent, NotificationCreatedEvent } from '@scxsocialcommon/event';

export class NotificationCreatedPublisher extends Publisher<NotificationCreatedEvent> {
    subject: Subjects.NotificationEvent = Subjects.NotificationEvent;
}
