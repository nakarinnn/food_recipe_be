import express from "express";
import * as CommentController from "../controllers/CommentController";

const router = express.Router();

router.post("/", CommentController.createComment);
router.get("/:foodId", CommentController.getCommentsByFoodId);

export default router;
