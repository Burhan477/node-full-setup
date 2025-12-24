export const appConfig = {
  name: "My TS Node App",
  version: "1.0.0",

  apiPrefix: "/api",
  apiVersion: "v1",

  // cors: {
  //   enabled: true,
  //   origins: ["http://localhost:3000"],
  //   methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  //   allowedHeaders: ["Content-Type", "Authorization"],
  //   credentials: true,
  // },

  server: {
    port: 5000, // fallback (env overrides)
    trustProxy: true,
  },

  cors: {
    enabled: true,
    origin: ["*"], // tighten later
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  },

  security: {
    rateLimit: {
      enabled: false,
      windowMs: 15 * 60 * 1000,
      maxRequests: 100,
    },
  },

  pagination: {
    defaultLimit: 10,
    maxLimit: 100,
  },
};
