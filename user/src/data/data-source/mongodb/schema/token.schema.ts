import mongoose from 'mongoose';

const TokenSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        token: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            expires: 3600,
            required: true,
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

const Token = mongoose.model('Token', TokenSchema);

export { Token };
