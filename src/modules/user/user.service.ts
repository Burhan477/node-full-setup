import bcrypt from "bcrypt";
import { UserModel } from "./user.model";
import { signToken } from "../../utils/jwt";

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

export const signup = async (payload: CreateUserPayload) => {
  const exists = await UserModel.findOne({ email: payload.email });
  if (exists) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const user = await UserModel.create({
    ...payload,
    password: hashedPassword,
  });

  const token = signToken({ id: user._id, role: user.role });

  return { token };
};

export const login = async (payload: CreateUserPayload) => {
  const user = await UserModel.findOne({ email: payload.email }).select(
    "+password"
  );

  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(payload.password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = signToken({ id: user._id, role: user.role });

  return { token };
};
