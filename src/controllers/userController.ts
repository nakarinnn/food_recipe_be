import { Request, Response } from "express";
import { createUser, getAllUsers } from "../services/userService";

// ฟังก์ชันสำหรับการสร้างผู้ใช้
export const createUserController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const user = await createUser(name, email, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

// ฟังก์ชันสำหรับดึงข้อมูลผู้ใช้ทั้งหมด
export const getUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};
