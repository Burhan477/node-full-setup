// src/modules/user/user.controller.ts
import { Request, Response } from "express";
import * as userService from "./user.service";

export const createUser = async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);

  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: user,
  });
};

export const getUsers = async (_req: Request, res: Response) => {
  const users = await userService.getUsers();

  res.status(200).json({
    success: true,
    data: users,
  });
};

export const signup = async (req: Request, res: Response) => {
  const result = await userService.signup(req.body);
  res.status(201).json({ success: true, data: result });
};

export const login = async (req: Request, res: Response) => {
  const result = await userService.login(req.body);

  res.status(200).json({
    success: true,
    data: result,
  });
};

export const profile = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = await userService.getUserById(String(req.user.user_id));

  res.status(200).json({
    success: true,
    data: user,
  });
};
