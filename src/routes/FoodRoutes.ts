import express from "express";
import {createFood, getAllFoods, getAllFoodsRandom, getFoodById, getFoodsByType} from "../controllers/foodController";

const router = express.Router();

router.post("/", createFood);
router.get("/getAllfood", getAllFoods);
router.get("/food-random", getAllFoodsRandom);
router.get("/:foodId", getFoodById);
router.get("/foodtype/:type", getFoodsByType)

export default router;
