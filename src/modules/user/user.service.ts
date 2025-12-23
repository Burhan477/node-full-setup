import bcrypt from "bcrypt";
import { UserModel } from "./user.model";
import { signToken } from "@/utils/jwt";
import { RoleModel } from "../role/role.model";
import { Types } from "mongoose";

interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
}

export const createUser = async (payload: CreateUserPayload) => {
  // 1. Check user existence
  const existingUser = await UserModel.findOne({ email: payload.email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // 2. Hash password
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  // 3. Save user
  const user = await UserModel.create({
    ...payload,
    password: hashedPassword,
  });

  // 4. Remove password from response
  const userObj = user.toObject();
  const { password, ...userWithoutPassword } = userObj;

  return userWithoutPassword;
};

export const getUsers = async () => {
  return UserModel.find().select("-password");
};

// export const signup = async (payload: CreateUserPayload) => {
//   const exists = await UserModel.findOne({ email: payload.email });
//   if (exists) throw new Error("User already exists");

//   const hashedPassword = await bcrypt.hash(payload.password, 10);

//   const user = await UserModel.create({
//     ...payload,
//     password: hashedPassword,
//   });

//   const token = signToken({ id: user._id, role: user.role_id });

//   return { token };
// };

export const signup = async (payload: {
  name: string;
  email: string;
  password: string;
}) => {
  // 1️⃣ Check existing user
  const exists = await UserModel.findOne({ email: payload.email });
  if (exists) {
    throw new Error("User already exists");
  }

  // 2️⃣ Find USER role
  const userRole = await RoleModel.findOne({ name: "user" });
  if (!userRole) {
    throw new Error("Default user role not found. Run role seeder.");
  }

  // 3️⃣ Hash password
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  // 4️⃣ Create user WITH role_id
  const user = await UserModel.create({
    name: payload.name,
    email: payload.email,
    password: hashedPassword,
    role_id: userRole._id,
  });

  // 5️⃣ Generate token
  const token = signToken({
    user_id: user._id,
    role_id: user.role_id,
  });

  // 6️⃣ Store token (stateful JWT)
  user.token = token;
  await user.save();

  return {
    id: user._id,
    email: user.email,
    token,
  };
};

export const login = async (payload: CreateUserPayload) => {
  const user = await UserModel.findOne({ email: payload.email }).select(
    "+password"
  );

  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(payload.password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = signToken({
    user_id: user._id,
    role_id: user.role_id,
  });
  // Store token (stateful JWT)
  user.token = token;
  await user.save();

  const data = { ...user.toObject(), token };

  return data;
};

export const getUserById = async (userId: string) => {
  if (!Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid user id");
  }

  const user = await UserModel.findById(new Types.ObjectId(userId)).select(
    "-password -token"
  );

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
