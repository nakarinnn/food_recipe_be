import User from "../models/userModel";

// ฟังก์ชันสำหรับสร้างผู้ใช้ใหม่
export const createUser = async (name: string, email: string, password: string) => {
  const newUser = new User({ name, email, password });
  await newUser.save();
  return newUser;
};

// ฟังก์ชันสำหรับดึงข้อมูลผู้ใช้ทั้งหมด
export const getAllUsers = async () => {
  return await User.find();
};
