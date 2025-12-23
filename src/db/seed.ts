import mongoose from "mongoose";
import { connectDB } from "@/config/db.config";
import { logger } from "@/config/logger.config";

// Seeders
import seedRoles from "./seeders/role.seeder";
import seedUsers from "./seeders/user.seeder";

const runSeeders = async () => {
  try {
    logger.info("🚀 Starting database seeding...");

    await connectDB();
    logger.info("✅ Database connected");

    // Run seeders in order
    await seedRoles();
    await seedUsers();

    logger.info("🎉 All seeders executed successfully");
  } catch (error) {
    logger.error("❌ Database seeding failed", error);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
    logger.info("🔌 Database connection closed");
  }
};

runSeeders();
