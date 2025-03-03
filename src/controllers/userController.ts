import { Request, Response } from "express";
import { createUser, getAllUsers, loginUser } from "../services/userService";

export const createUserController = async (req: Request, res: Response) => {
  const { name, email, password, avatar_url } = req.body;
  try {
    const user = await createUser(name, email, password, avatar_url);
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Error creating user", error });
    }
  }
};


export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const { user, token } = await loginUser(email, password);

    res.cookie("authToken", token, {
      httpOnly: true,  // ป้องกันการเข้าถึง cookie ผ่าน JavaScript
      // secure: process.env.NODE_ENV === "production", // ใช้ HTTPS ใน production
      secure: false,
      maxAge: 3600000, // อายุ cookie 1 ชั่วโมง
    });

    res.status(200).json({ message: "Login successful", user: { id: user._id, name: user.name, email: user.email, avatar_url: user.avatar_url } });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
    res.status(400).json({ message: "Login failed", error });}
  }
};

export const getUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};
