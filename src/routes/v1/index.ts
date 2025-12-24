// src/routes/v1/index.ts
import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import adminRoutes from "./admin.routes";
import healthRoutes from "./health.routes";

const router = Router();

router.use("/", authRoutes);
router.use("/users", userRoutes);
router.use("/admin", adminRoutes);
router.use("/", healthRoutes);

export default router;
