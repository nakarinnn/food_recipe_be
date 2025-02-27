import { Request, Response } from "express";
import * as CommentService from "../services/CommentService";

export const createComment = async (req: Request, res: Response) => {
  try {
    const comment = await CommentService.createComment(req.body);
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getCommentsByFoodId = async (req: Request, res: Response) => {
  try {
    const comments = await CommentService.getCommentsByFoodId(req.params.foodId);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
