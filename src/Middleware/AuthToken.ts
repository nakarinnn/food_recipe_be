import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// กำหนด type ที่จะรองรับการใช้งาน req.user
interface CustomRequest extends Request {
  user?: any;  // user สามารถเป็นข้อมูลใด ๆ ตามที่คุณต้องการ เช่น userId, email, etc.
}

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.authToken; // อ่าน token จาก cookie

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // ตรวจสอบความถูกต้องของ token
    const decoded = jwt.verify(token, JWT_SECRET); // ตรวจสอบ JWT token
    req.user = decoded;  // บันทึกข้อมูลผู้ใช้ที่ถูก decode ลงใน request object
    next();  // ไปยัง route handler ถ้า token ถูกต้อง
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
