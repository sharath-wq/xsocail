import mongoose from 'mongoose';

const ReportSchema = new mongoose.Schema(
    {
        postId: {
            type: String,
            required: true,
        },
        reporterId: {
            type: String,
            required: true,
        },
        timestamp: {
            type: Date,
            required: true,
            default: Date.now,
        },
        reason: {
            type: String,
            required: true,
        },
        actionTaken: {
            type: String,
            enum: ['pending', 'post-removed', 'account-suspended', 'user-blocked'],
            default: 'pending',
            required: true,
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

const Report = mongoose.model('Report', ReportSchema);

export { Report };
