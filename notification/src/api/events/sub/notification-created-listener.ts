import { Listener, NotificationCreatedEvent, Subjects } from '@scxsocialcommon/event';
import { queueGroupName } from './queue-group-name';
import { ICreateNotificationUseCase } from '../../../domain/interface/usecase/create-notification.use-case';
import { Stan, Message } from 'node-nats-streaming';

export class NotificationCreatedListener extends Listener<NotificationCreatedEvent> {
    subject: Subjects.NotificationEvent = Subjects.NotificationEvent;
    queueGroupName: string = queueGroupName;
    createNotificationUseCase: ICreateNotificationUseCase;

    constructor(client: Stan, createNotificationUseCase: ICreateNotificationUseCase) {
        super(client);
        this.createNotificationUseCase = createNotificationUseCase;
    }

    async onMessage(data: NotificationCreatedEvent['data'], msg: Message) {
        if (!this.createNotificationUseCase) {
            console.error('Create notfication is not initialized');
            msg.ack();
            return;
        }

        try {
            await this.createNotificationUseCase.execute({ ...data });

            msg.ack();
        } catch (error: any) {
            console.error('Error Processing Notification createe Event'), error.message;
        }
    }
}
