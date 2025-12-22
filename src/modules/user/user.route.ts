import { Router } from "express";
import { createUser, getUsers, login, signup } from "./user.controller";
import { validate } from "../../core/validation/index";
import { createUserSchema, loginSchema, signupSchema } from "./user.validation";
import { authMiddleware } from "../../core/middlewares/auth.middleware";


const router = Router();

/**
 * POST /api/users
 */
router.post("/", validate(createUserSchema), createUser);
router.get("/me", authMiddleware, getUsers);

router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(loginSchema), login);

/**
 * GET /api/users
 */
router.get("/", getUsers);

export default router;
