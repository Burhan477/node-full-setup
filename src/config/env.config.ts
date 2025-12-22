import dotenv from "dotenv";

dotenv.config();

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: Number(process.env.PORT) || 5000,

  MONGO_URI: process.env.MONGODB_URI as string,
  MONGO_DB: process.env.MONGO_DB as string,

  JWT_SECRET: process.env.JWT_SECRET as string,
};

// Fail fast if critical envs are missing
if (!env.MONGO_URI || !env.MONGO_DB) {
  throw new Error("❌ Missing required MongoDB environment variables");
}
