import { Request, Response, NextFunction } from "express";
import { RoleModel } from "@/modules/role/role.model";

export const requireRole = (roleName: "admin" | "user") => {
  return async (req: any, res: Response, next: NextFunction) => {
    const roleId = req.user?.role_id;

    if (!roleId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const role = await RoleModel.findById(roleId);

    if (!role || role.name !== roleName) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
};
