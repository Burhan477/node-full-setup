// src/routes/v1/auth.routes.ts
import { Router } from "express";
import { signup, login } from "@/modules/user/user.controller";
import { validate } from "@/core/validation";
import { signupSchema, loginSchema } from "@/modules/user/user.validation";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

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
 *             required: [name, email, password]
 *     responses:
 *       201:
 *         description: User registered successfully
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
 *             required: [email, password]
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", validate(loginSchema), login);

export default router;
