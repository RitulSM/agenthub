import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

async function dbConnect(): Promise<typeof mongoose> {
  try {
    if (mongoose.connection.readyState >= 1) {
      return mongoose;
    }

    console.log('Connecting to MongoDB...');
    const connection = await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    return connection;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

export default dbConnect;

