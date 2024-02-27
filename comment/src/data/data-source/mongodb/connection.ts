import mongoose from 'mongoose';
import { CommentDataSource } from './mongodb-comment.data-source';

export const connect = async (MONGO_URI: string) => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Database Connected 💾');
        return new CommentDataSource();
    } catch (error) {
        console.log(error);
    }
};
