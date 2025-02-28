import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

interface IUser extends Document {
  uuid: string;
  name: string;
  email: string;
  password: string;
  avatar_url: string;
}

const userSchema: Schema = new Schema({
  uuid: { type: String, default: uuidv4, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar_url: { type: String, required: true },
});

const User = mongoose.model<IUser>("User", userSchema, "users");

export default User;
