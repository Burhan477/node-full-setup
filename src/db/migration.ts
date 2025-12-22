import mongoose from "mongoose";
import { connectDB } from "../config/db.config";
import { logger } from "../config/logger.config";

// 👇 Import ALL models here (now & future)
import "../modules/user/user.model";
// import "../modules/role/role.model";
// import "../modules/rolePermission/rolePermission.model";

const migrate = async () => {
  try {
    logger.info("🚀 Starting DB migration (init)");

    await connectDB();
    logger.info("✅ Database connected");

    // Initialize all registered models (creates indexes)
    const models = Object.values(mongoose.models);

    for (const model of models) {
      await model.init();
      logger.info(`📦 Initialized model: ${model.modelName}`);
    }

    logger.info("✅ DB migration completed successfully");
    process.exit(0);
  } catch (error) {
    logger.error("❌ DB migration failed", error);
    process.exit(1);
  }
};

migrate();
