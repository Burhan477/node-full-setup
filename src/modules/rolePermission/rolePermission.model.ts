import { Schema, model, Types } from "mongoose";

export interface IRolePermission {
  role_id: Types.ObjectId;
  permission_ids: Types.ObjectId[];
}

const RolePermissionSchema = new Schema<IRolePermission>(
  {
    role_id: {
      type: Schema.Types.ObjectId,
      ref: "Role",
      required: true,
      unique: true,
    },
    permission_ids: [
      {
        type: Schema.Types.ObjectId,
        ref: "Permission",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

export const RolePermissionModel = model<IRolePermission>(
  "RolePermission",
  RolePermissionSchema
);
