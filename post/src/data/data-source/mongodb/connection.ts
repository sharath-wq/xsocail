import mongoose from 'mongoose';
import { MongoDBPostDataSource } from './mongodb-post-datasource';

export const connect = async (MONGO_URI: string) => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Database Connected 💾');
        return new MongoDBPostDataSource();
    } catch (error) {
        console.log(error);
    }
};
