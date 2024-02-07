import mongoose, { mongo } from 'mongoose';
import { MongoDBUserDataSource } from './mongodb-user-datasource';

export const connect = async (MONGO_URI: string) => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Database Connected 💾');
        return new MongoDBUserDataSource();
    } catch (error) {
        console.log(error);
    }
};
