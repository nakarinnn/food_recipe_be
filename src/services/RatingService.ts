import Rating from "../models/ratingModel";
import Food from "../models/foodModel";

export const createRating = async (foodId: string, userId: string, rating: number) => {
  try {
    const existingRating = await Rating.findOne({ foodId, userId });

    if (!existingRating) {
      const newRating = await Rating.create({ foodId, userId, rating });

      await Food.findByIdAndUpdate(
        foodId,
        { $push: { ratings: newRating._id } },
        { new: true }
      );

      return { newRating, message: "Rating successful" };
    } else {
      const newRating = await Rating.findOneAndUpdate(
        { foodId, userId },
        { $set: { rating } },
        { new: true }
      );

      return { newRating, message: "Rating updated successfully" };
    }
  } catch (error) {
    console.error("Error in createRating:", error);
    return { error: "An error occurred while processing the rating" };
  }
};

export const getRatingsByFoodIdAndUserId = async (userId: string, foodId: string) => {
  const rating = await Rating.findOne({ userId, foodId });
  return rating;
};

export const getAverageRating = async (foodId: string) => {
  const ratings = await Rating.find({ foodId });

  if (ratings.length === 0) return 0;

  const average = ratings.reduce((sum, r: any) => sum + r.rating, 0) / ratings.length;
  return average;
};
