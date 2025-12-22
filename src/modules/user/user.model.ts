import { Schema, model } from "mongoose";
import { IUser } from "../../types/database";

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

UserSchema.index({ email: 1 }, { unique: true });

export const UserModel = model<IUser>("User", UserSchema);
