import app from "@/app";
import { env } from "@/config/env.config";
import { logger } from "@/config/logger.config";
import { connectDB } from "@/config/db.config";

export const startServer = async (): Promise<void> => {
  try {
    logger.info(`🚀 Starting server in ${env.NODE_ENV} mode`);

    // Enable DB later when needed
    await connectDB();

    app.listen(env.PORT, () => {
      logger.info(`✅ Server running on port ${env.PORT}`);
    });
  } catch (error) {
    logger.error("❌ Failed to start server", error);
    process.exit(1);
  }
};
