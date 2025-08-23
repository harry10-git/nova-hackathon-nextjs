// filepath: /Users/harryraj/Desktop/nova-hackathon/my-app/lib/mongoose.js
import mongoose from "mongoose";

const uri = "mongodb+srv://ashik1234d:1234567812345678@cluster0.nyaadry.mongodb.net/hirelink?retryWrites=false&w=majority";

let isConnected = false; // Track connection status

export async function connectToDatabase() {
  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}