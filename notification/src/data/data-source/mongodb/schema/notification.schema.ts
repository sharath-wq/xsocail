import mongoose from 'mongoose';
import { INotification } from '../../../../domain/entities/notifications';

const NotificationSchema = new mongoose.Schema(
    {
        senderId: {
            type: String,
            required: true,
        },
        receiverId: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        postId: {
            type: String,
        },
        isRead: {
            type: Boolean,
            required: true,
            default: false,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            },
        },
    }
);

const Notification = mongoose.model<INotification>('Notification', NotificationSchema);

export { Notification };
