import { Request, Response } from "express";
import * as LikeService from "../services/LikeService";

export const likeItem = async (req: Request, res: Response) => {
    const { userId, targetId, targetType } = req.body;
    try {
        const like = await LikeService.likeItem(userId, targetId, targetType);
        res.status(201).json(like);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

export const isLiked = async (req: Request, res: Response) => {
    const { userId, targetId, targetType } = req.body;
    try {
        const like = await LikeService.isLiked(userId, targetId, targetType);
        res.status(201).json(like);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

export const getUserLikes = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const likedRecipes = await LikeService.getUserLikes(userId);
        res.status(200).json({ likedRecipes: likedRecipes.map(like => like.targetId) });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

