import mongoose from 'mongoose';
import { Password } from '../../../../utils/password';

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        bio: {
            type: String,
            default: '',
        },
        imageUrl: {
            type: String,
            required: true,
            default: 'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg',
        },
        gender: {
            type: String,
            enum: ['male', 'female', 'N/A'],
            default: 'N/A',
        },
        posts: [
            {
                type: String,
            },
        ],
        followers: [
            {
                type: String,
            },
        ],
        following: [
            {
                type: String,
            },
        ],
        savedPosts: [
            {
                type: String,
            },
        ],
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        verified: {
            type: Boolean,
            default: false,
        },
        isBlocked: {
            type: Boolean,
            default: false,
        },
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

UserSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }

    // if (this.email === 'chandranpsharath@gmail.com') {
    //     this.set('verified', true);
    //     this.set('isAdmin', true);
    // }

    done();
});

const User = mongoose.model('User', UserSchema);

export { User };
