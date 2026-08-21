import type { Request, Response } from "express";
import { success, z } from "zod";
import User from "../schema/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .max(30, "Username must be at most 30 characters long"),
  email: z
    .string()
    .email("Invalid email address")
    .max(50, "Email must be at most 50 characters long"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(50, "Password must be at most 50 characters long"),
});

const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .max(50, "Email must be at most 50 characters long"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(50, "Password must be at most 50 characters long"),
});

// types/api.ts
export type ApiResponse<T = null> = {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]> | string;
};

export async function register(req: Request, res: Response) {
  const { username, email, password } = req.body;
  const result = userSchema.safeParse({ username, email, password });

  if (!result.success) {
    return res.status(422).json({
      success: false,
      message: "Validation error",
      errors: result.error.flatten().fieldErrors,
    });
  }
  try {
    const exists = await User.findOne({ email });
    if (exists) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username: username,
      password: hashedPassword,
      email: email,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    });
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const result = loginSchema.safeParse({ email, password });
  if (!result.success) {
    return res.status(422).json({
      success: false,
      message: "Validation error",
      errors: result.error.flatten().fieldErrors,
    });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false,
             message: "Invalid credentials" });
    }
    // console.log("env",process.env.JWT_SECRET)

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 3600000,
    });
    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        token: token,
      },
    });
  } catch (err) {
    // console.error(err)
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    });
  }
}
