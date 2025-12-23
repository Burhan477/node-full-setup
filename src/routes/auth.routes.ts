import { Router } from "express";
import { signup, login } from "@/modules/user/user.controller";
import { validate } from "@/core/validation";
import { signupSchema, loginSchema } from "@/modules/user/user.validation";

const router = Router();

router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(loginSchema), login);

export default router;
