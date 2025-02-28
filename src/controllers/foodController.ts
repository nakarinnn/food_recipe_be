import { Request, Response } from "express";
import * as FoodService from "../services/FoodService";

export const createFood = async (req: Request, res: Response) => {
  try {
    const food = await FoodService.createFood(req.body);
    res.status(201).json(food);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getAllFoods = async (req: Request, res: Response) => {
  try {
    const foods = await FoodService.getAllFoods();
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getFoodsByType = async (req: Request, res: Response) => {
  try {
    const foods = await FoodService.getFoodsByType(req.params.type);
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getAllFoodsRandom = async (req: Request, res: Response) => {
  try {
    const foods = await FoodService.getAllFoodsRandom();
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getFoodById = async (req: Request, res: Response) => {
  try {
    const food = await FoodService.getFoodById(req.params.foodId);

    // if (!food)
    //   return res.status(404).json({ message: "Food not found" });

    res.status(200).json(food);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
