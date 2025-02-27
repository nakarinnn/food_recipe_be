import { Request, Response } from "express";
import * as RatingService from "../services/RatingService";

export const createRating = async (req: Request, res: Response) => {
  try {
    const rating = await RatingService.createRating(req.body);
    res.status(201).json(rating);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getRatingsByFoodId = async (req: Request, res: Response) => {
  try {
    const ratings = await RatingService.getRatingsByFoodId(req.params.foodId);
    res.status(200).json(ratings);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
