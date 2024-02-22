import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
    {
        author: {
            userId: {
                type: String,
                required: true,
            },
            username: {
                type: String,
                required: true,
            },
            imageUrl: {
                type: String,
                required: true,
            },
        },
        caption: {
            type: String,
            required: true,
            default: '',
        },
        imageUrls: [
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
            default: Date.now,
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

const Post = mongoose.model('Post', PostSchema);

export { Post };
