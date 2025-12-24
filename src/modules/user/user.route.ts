// src/modules/user/user.route.ts

import { Router } from "express";
import {
  createUser,
  getUsers,
  login,
  signup,
  profile,
} from "./user.controller";
import { validate } from "@/core/validation/index";
import { createUserSchema, loginSchema, signupSchema } from "./user.validation";
import { authMiddleware } from "@/core/middlewares/auth.middleware";
import { requireRole } from "@/core/middlewares/role.middleware";

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

const router = Router();

/**
 * POST /api/users
 */
router.post("/", validate(createUserSchema), createUser);
router.get("/me", authMiddleware, getUsers);
router.get("/profile", authMiddleware, requireRole("user"), profile);
// router.get("/profile", authMiddleware, profile);

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: User signup
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 */
router.post("/signup", validate(signupSchema), signup);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", validate(loginSchema), login);

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Get current user profile
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User profile
 *       401:
 *         description: Unauthorized
 */
router.get("/", getUsers);

export default router;
