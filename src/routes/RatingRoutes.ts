import express from "express";
import * as RatingController from "../controllers/RatingController";

const router = express.Router();

router.post("/", RatingController.createRating);
router.post("/get-rating", RatingController.getRatingsByFoodIdAnduserId);
router.post("/average-rating", RatingController.getAverageRating);

export default router;
