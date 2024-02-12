import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
    {
        authorId: {
            type: String,
            required: true,
        },
        content: {
            type: String,
        },
        media: [
            {
                type: String,
            },
        ],
        likes: [
            {
                type: String,
            },
        ],
        comments: [
            {
                type: String,
            },
        ],
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        tags: [{ type: String }],
        reportedBy: [
            {
                type: String,
            },
        ],
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

const Post = mongoose.model('User', PostSchema);

export { Post };
