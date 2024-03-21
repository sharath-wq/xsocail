import mongoose from 'mongoose';

const ReportSchema = new mongoose.Schema(
    {
        userId: {
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
            enum: ['Warning Issued', 'Account Blocked', 'Pending'],
            default: 'Pending',
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

const Report = mongoose.model('UserReport', ReportSchema);

export { Report };
