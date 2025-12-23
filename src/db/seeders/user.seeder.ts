import bcrypt from "bcrypt";
import { UserModel } from "@/modules/user/user.model";
import { RoleModel } from "@/modules/role/role.model";
import { logger } from "@/config/logger.config";

export default async function seedUsers() {
  logger.info("🌱 Seeding users...");

  const adminRole = await RoleModel.findOne({ name: "admin" });
  const userRole = await RoleModel.findOne({ name: "user" });

  if (!adminRole || !userRole) {
    throw new Error("Roles not found. Run role seeder first.");
  }

  const users = [
    {
      name: "Admin User",
      email: "admin@example.com",
      password: "Admin@123",
      role_id: adminRole._id,
    },
    {
      name: "Normal User",
      email: "user@example.com",
      password: "User@123",
      role_id: userRole._id,
    },
  ];

  for (const user of users) {
    const exists = await UserModel.findOne({ email: user.email });
    if (exists) {
      logger.warn(`⚠️ User already exists: ${user.email}`);
      continue;
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    await UserModel.create({
      name: user.name,
      email: user.email,
      password: hashedPassword,
      role_id: user.role_id,
    });

    logger.info(`✅ User created: ${user.email}`);
  }

  logger.info("🎉 User seeding completed");
}
