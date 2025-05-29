import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_CONNECTION_URL);
        console.log('mongodb connected');
    } catch (error) {
        console.error('Error connect to MongoDB:', error.message);
        process.exit(1);
    }
};

export default connectDB;
