/**
 * File: backend/src/config/db.js
 * Purpose: Connects the backend server to MongoDB using Mongoose.
 * Features: Reads MONGO_URI from environment variables and exits safely on connection failure.
 * Used by: src/server.js and src/seed/seed.js.
 * Future edits: Change connection logging or MongoDB options here if deployment requirements change.
 */

import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is missing from environment variables.');
    }
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};
