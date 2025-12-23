import { Request, Response, NextFunction } from "express";
import { RolePermissionModel } from "@/modules/rolePermission/rolePermission.model";

export const requirePermission = (permission: string) => {
  return async (req: any, res: Response, next: NextFunction) => {
    const roleId = req.user?.role_id;

    if (!roleId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const rolePermission = await RolePermissionModel.findOne({
      role_id: roleId,
    }).populate("permission_ids");

    if (!rolePermission) {
      return res.status(403).json({ message: "Access denied" });
    }

    const allowed = rolePermission.permission_ids.some(
      (perm: any) => perm.name === permission
    );

    if (!allowed) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
};
