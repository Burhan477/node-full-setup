import mongoose from "mongoose";
import { connectDB } from "../config/db.config";
import { logger } from "../config/logger.config";
import { seedUsers } from "./seeders/user.seeder";

// Import all seeders here
// import { seedRoles } from "./role.seeder";

const runSeeders = async () => {
  try {
    logger.info("🚀 Starting database seeding...");

    await connectDB();
    logger.info("✅ Database connected");

    // Run seeders in order
    await seedUsers();
    // await seedRoles();

    logger.info("🎉 All seeders executed successfully");
    process.exit(0);
  } catch (error) {
    logger.error("❌ Database seeding failed", error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
};

runSeeders();
