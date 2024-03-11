import mongoose from 'mongoose';

export const connect = async (MONGO_URI: string) => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Database Connected 💾');
        return true;
    } catch (error) {
        console.log(error);
    }
};
