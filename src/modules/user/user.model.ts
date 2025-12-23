import { Schema, model, Types } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  token?: string;
  role_id: Types.ObjectId;
}

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
    token: { type: String, select: false },
    role_id: {
      type: Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
  },
  { timestamps: true }
);

export const UserModel = model<IUser>("User", UserSchema);
