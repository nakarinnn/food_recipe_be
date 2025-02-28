import express from "express";
import * as likeController from "../controllers/likeController";

const router = express.Router();

router.post("/like", likeController.likeItem);
router.get("/like/:userId", likeController.getUserLikes);

export default router;
