import { Schema, model, Types } from "mongoose";

export interface IRole {
  name: string;
  description?: string;
}

const RoleSchema = new Schema<IRole>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

export const RoleModel = model<IRole>("Role", RoleSchema);
