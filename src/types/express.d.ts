import { Types } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      user?: {
        user_id: string | Types.ObjectId;
        role_id: string | Types.ObjectId;
      };
    }
  }
}

export {};
