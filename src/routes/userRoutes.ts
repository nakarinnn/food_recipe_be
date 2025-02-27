import express from "express";
import { createUserController, getUsersController, loginController } from "../controllers/userController";

const router = express.Router();

router.post("/register", createUserController);
router.post("/login", loginController);
router.get("/users", getUsersController);

export default router;
