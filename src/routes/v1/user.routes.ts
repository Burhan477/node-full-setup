import { Router } from "express";
import { profile } from "@/modules/user/user.controller";
import { authMiddleware } from "@/core/middlewares/auth.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User APIs for authenticated users
 */

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get current logged-in user admin profile and user profile
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User profile
 *       401:
 *         description: Unauthorized
 */
router.get("/profile", authMiddleware, profile);

export default router;
