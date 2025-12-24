import { Router } from "express";
import { profile, getUsers } from "@/modules/user/user.controller";
import { authMiddleware } from "@/core/middlewares/auth.middleware";
import { requireRole } from "@/core/middlewares/role.middleware";

const router = Router();

/**
 * GET /api/v1/users/me
 */
router.get("/me", authMiddleware, profile);

/**
 * GET /api/v1/users
 * Admin-only (example)
 */
router.get("/", authMiddleware, requireRole("admin"), getUsers);

export default router;
