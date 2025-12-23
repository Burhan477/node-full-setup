import { RoleModel } from "@/modules/role/role.model";
import { logger } from "@/config/logger.config";

export default async function seedRoles(): Promise<void> {
  logger.info("🌱 Seeding roles (create-only)...");

  const roles = [
    {
      name: "admin",
      description: "Administrator with full access",
    },
    {
      name: "user",
      description: "Standard application user",
    },
  ];

  for (const role of roles) {
    const exists = await RoleModel.findOne({ name: role.name });

    if (exists) {
      logger.warn(`⚠️ Role already exists: ${role.name}`);
      continue;
    }

    await RoleModel.create(role);
    logger.info(`✅ Role created: ${role.name}`);
  }

  logger.info("🎉 Role seeding completed");
}
