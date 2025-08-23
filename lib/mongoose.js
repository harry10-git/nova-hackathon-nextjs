import mongoose from 'mongoose';

const MONGODB_URI = "mongodb+srv://ashik1234d:1234567812345678@cluster0.nyaadry.mongodb.net/hirelink?retryWrites=true&w=majority&appName=Cluster0";

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then((mongoose) => mongoose);
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectToDatabase;