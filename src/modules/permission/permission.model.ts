import { Schema, model } from "mongoose";

export interface IPermission {
  name: string;
  description?: string;
}

const PermissionSchema = new Schema<IPermission>(
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

export const PermissionModel = model<IPermission>(
  "Permission",
  PermissionSchema
);
