import Rating from "../models/ratingModel";

export const createRating = async (ratingData: any) => {
  return await Rating.create(ratingData);
};

export const getRatingsByFoodId = async (foodId: string) => {
  return await Rating.find({ foodId });
};

export const getAverageRating = async (foodId: string) => {
  const ratings = await Rating.find({ foodId });
  if (ratings.length === 0) return 0;
  return ratings.reduce((sum, r: any) => sum + r.score, 0) / ratings.length;
};
