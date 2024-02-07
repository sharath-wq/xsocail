import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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
        },
        imageUrl: {
            type: String,
            default: 'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg',
        },
        gender: {
            type: String,
            enum: ['male', 'female'],
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
        settings: {
            privacy: {
                type: String,
                enum: ['public', 'private'],
            },
            theme: {
                type: String,
                enum: ['dark', 'light'],
            },
        },
        isAdmin: {
            type: Boolean,
            default: false,
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

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
    // if (this.email === "admin") {
    //     this.isAdmin = true;
    // }
    next();
});

UserSchema.methods.isPasswordMatched = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', UserSchema);

export { User };
