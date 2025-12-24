import { Router } from "express";
import { authMiddleware } from "@/core/middlewares/auth.middleware";
import { requireRole } from "@/core/middlewares/role.middleware";
import { getUsers } from "@/modules/user/user.controller";

const router = Router();

/**
 * All routes below are ADMIN ONLY
 */
router.use(authMiddleware, requireRole("admin"));

/**
 * GET /api/v1/admin/users
 * Get all users (admin only)
 */
router.get("/users", getUsers);

export default router;
