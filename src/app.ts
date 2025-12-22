// src/app.ts
import express, { Application } from "express";
import routes from "./routes";
import { errorHandler } from "./core/middlewares/error.middleware";

const app: Application = express();

/**
 * Global middlewares
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Welcome route (root)
 */
app.get("/", (_req, res) => {
  res.status(200).json({
    message: "🚀 Welcome to My TS Node App API",
  });
});

/**
 * API routes
 */
app.use("/api", routes);

/**
 * 404 handler
 */
app.use((_req, _res, next) => {
  const error = new Error("Route not found");
  (error as any).status = 404;
  next(error);
});

/**
 * Global error handler
 */
app.use(errorHandler);

export default app;
