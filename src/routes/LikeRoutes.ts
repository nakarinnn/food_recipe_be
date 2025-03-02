import express from "express";
import * as likeController from "../controllers/likeController";

const router = express.Router();

router.post("/", likeController.likeItem);
router.get("/:userId", likeController.getUserLikes);

export default router;
