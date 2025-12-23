// src/config/db.config.ts
import mongoose from "mongoose";
import { env } from "./env.config";
import { logger } from "./logger.config";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

const globalCache = global.mongoose ?? {
  conn: null,
  promise: null,
};

const connectDB = async (): Promise<typeof mongoose> => {
  if (globalCache.conn) {
    return globalCache.conn;
  }

  if (!globalCache.promise) {
    globalCache.promise = mongoose.connect(env.MONGO_URI, {
      dbName: env.MONGO_DB,
      // serverSelectionTimeoutMS: 10000,
    });
  }

  try {
    globalCache.conn = await globalCache.promise;
    logger.info("✅ MongoDB connected");
  } catch (error) {
    logger.error("❌ MongoDB connection failed", error);

    globalCache.promise = null;
    throw error;
  }

  global.mongoose = globalCache;
  return globalCache.conn;
};

export { connectDB };
