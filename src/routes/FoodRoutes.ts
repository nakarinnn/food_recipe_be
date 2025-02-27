import express from "express";
import {createFood, getAllFoods, getAllFoodsRandom, getFoodById} from "../controllers/foodController";

const router = express.Router();

router.post("/food", createFood);
router.get("/food", getAllFoods);
router.get("/food-random", getAllFoodsRandom);
router.get("/food/:foodId", getFoodById);

export default router;
