import { Router } from "express";
import { login, signup } from "@/modules/user/user.controller";
import { validate } from "@/core/validation";
import { loginSchema, signupSchema } from "@/modules/user/user.validation";

const router = Router();

/**
 * POST /api/v1/signup
 */
router.post("/signup", validate(signupSchema), signup);

/**
 * POST /api/v1/login
 */
router.post("/login", validate(loginSchema), login);

export default router;
