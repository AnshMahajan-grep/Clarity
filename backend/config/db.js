import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(process.env.NODE_ENV === 'production' ? '.env.production' : '.env')
});

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    // Add indexes in production
    if (process.env.NODE_ENV === 'production') {
      // Ensure indexes for frequently queried fields
      await Promise.all([
        conn.models.User?.createIndexes(),
        conn.models.Announcement?.createIndexes(),
        conn.models.PersonalTask?.createIndexes()
      ]);
    }

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

export default connectDB;
