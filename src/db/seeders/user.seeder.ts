import bcrypt from "bcrypt";
import { logger } from "../../config/logger.config";
import { UserModel } from "../../modules/user/user.model";

export const seedUsers = async (): Promise<void> => {
  logger.info("🌱 Seeding users...");

  const existingUsers = await UserModel.countDocuments();
  if (existingUsers > 0) {
    logger.warn("⚠️ Users already exist. Skipping user seeder.");
    return;
  }

  const password = await bcrypt.hash("Password@123", 10);

  await UserModel.insertMany([
    {
      name: "Admin User",
      email: "admin@example.com",
      password,
    },
    {
      name: "Test User",
      email: "user@example.com",
      password,
    },
  ]);

  logger.info("✅ User seeding done");
};
