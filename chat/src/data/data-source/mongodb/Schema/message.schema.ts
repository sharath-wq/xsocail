import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema(
    {
        conversationId: {
            type: String,
            required: true,
        },
        sender: {
            type: String,
            required: true,
        },
        text: {
            type: String,
        },
        imageUrl: {
            type: String,
        },
        isRead: {
            type: Boolean,
            required: true,
            default: false,
        },
        createdAt: {
            type: Date,
            required: true,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            required: true,
            default: Date.now,
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.password;
                delete ret.__v;
            },
        },
    }
);

const Message = mongoose.model('Message', MessageSchema);

export { Message };
