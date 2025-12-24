import { Router } from "express";
import { authMiddleware } from "@/core/middlewares/auth.middleware";
import { requireRole } from "@/core/middlewares/role.middleware";
import { getUsers } from "@/modules/user/user.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin-only APIs
 */

// Protect all admin routes
router.use(authMiddleware, requireRole("admin"));

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all users (admin only)
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *       403:
 *         description: Forbidden
 */
router.get("/users", getUsers);

export default router;
