import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../../config/env.config";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!env.JWT_SECRET) {
    return res.status(500).json({ message: "Server configuration error" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token as string, env.JWT_SECRET as string);
    (req as any).user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};
