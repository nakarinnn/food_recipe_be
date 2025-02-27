import express from "express";
import * as RatingController from "../controllers/RatingController";

const router = express.Router();

router.post("/", RatingController.createRating);
router.get("/:foodId", RatingController.getRatingsByFoodId);

export default router;
