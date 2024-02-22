import mongoose from 'mongoose';

const OtpSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        otp: {
            type: String,
            required: true,
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

OtpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 30 });

const Otp = mongoose.model('Otp', OtpSchema);

export { Otp };
