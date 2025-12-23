import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "@/modules/user/user.route";

const router = Router();

// Health check
router.get("/health", (_req, res) => {
  res.status(200).json({ status: "OK" });
});

// Auth routes (root-level)
router.use("/", authRoutes);

// Other routes (later)
router.use("/users", userRoutes);

export default router;
