import express from "express";
import { createUserController, getUsersController } from "../controllers/userController";

const router = express.Router();

router.post("/users", createUserController);
router.get("/users", getUsersController);

export default router;
