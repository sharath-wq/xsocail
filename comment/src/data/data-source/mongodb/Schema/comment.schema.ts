import mongoose from 'mongoose';
import { IComment } from '../../../../domain/entities/comment';

const CommentSchema = new mongoose.Schema(
    {
        postId: {
            type: String,
            required: true,
        },
        author: {
            id: {
                type: String,
                required: true,
            },
            imageUrl: {
                type: String,
                required: true,
            },
            username: {
                type: String,
                required: true,
            },
        },
        content: {
            type: String,
            required: true,
        },
        likes: [
            {
                type: String,
            },
        ],
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
                delete ret.password;
                delete ret.__v;
            },
        },
    }
);

const Comment = mongoose.model<IComment>('Comment', CommentSchema);

export { Comment };
