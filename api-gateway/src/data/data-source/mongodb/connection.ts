import mongoose, { mongo } from 'mongoose';
import { MongoDBUserDataSource } from './mongo-db-user-data-source';

export const connect = async (MONGO_URI: string) => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Database Connected 💾');
        return new MongoDBUserDataSource();
    } catch (error) {
        console.log(error);
    }
};
