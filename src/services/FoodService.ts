import Food from "../models/foodModel";
import Like from "../models/likeModel";
import Rating from "../models/ratingModel";
import Comment from "../models/commentModel";
import mongoose from "mongoose";

export const createFood = async (foodData: any, userId: string) => {
  const newFood = await Food.create({
    name: foodData.name,
    category: foodData.category,
    description: foodData.description,
    cookTime: foodData.cookTime,
    image: foodData.image,
    owner: foodData.owner,
    ingredients: foodData.ingredients,
    instructions: foodData.instructions,
    ratings: foodData.ratings,
    comments: foodData.comments
  });

  const categoryMap: Record<string, string> = {
    "อาหารคาว": "main-dish",
    "อาหารหวาน": "dessert",
    "เครื่องดื่ม": "drink",
  };
  return newFood;
};

export const getAllFoods = async () => {
  const foods = await Food.find().populate("ratings").populate("comments").lean();

  const foodsWithAvg = foods.map((food) => ({
    ...food,
    avg: food.ratings.length
      ? food.ratings.reduce((sum, r: any) => sum + r.rating, 0) / food.ratings.length
      : 0,
  }));

  return foodsWithAvg;
};

export const getFoodsRandom = async () => {
  const foods = await Food.find().populate("ratings").populate("comments").limit(12).lean();

  const foodsWithAvg = foods.map((food) => ({
    ...food,
    avg: food.ratings.length
      ? food.ratings.reduce((sum, r: any) => sum + r.rating, 0) / food.ratings.length
      : 0,
  }));

  return foodsWithAvg;
};

export const getFoodById = async (id: string) => {
  try {
    const food = await Food.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) }
      },
      {
        $lookup: {
          from: 'users',                  
          localField: 'owner',                
          foreignField: '_id',               
          as: 'ownerDetails'                 
        }
      },
      {
        $unwind: '$ownerDetails'          
      },
    ]);
    return food;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getFoodByUserId = async (userId: string) => {
  const foods = await Food.find({ owner: userId }).populate("ratings").populate("comments").sort({ createdAt: -1 }).lean();

  const foodsWithAvg = foods.map((food) => ({
    ...food,
    avg: food.ratings.length
      ? food.ratings.reduce((sum, r: any) => sum + r.rating, 0) / food.ratings.length
      : 0,
  }));

  return foodsWithAvg;
};

export const getFoodsByType = async (type: string) => {
  try {
    const categoryMap: Record<string, string> = {
      "main-dish": "อาหารคาว",
      "dessert": "อาหารหวาน",
      "drink": "เครื่องดื่ม",
    };

    const category = categoryMap[type];
    if (!category) return [];

    const foods = await Food.find({ category }).populate("ratings").sort({ createdAt: -1 }).lean();

    const foodsWithAvg = foods.map((food) => ({
      ...food,
      avg: food.ratings.length
        ? food.ratings.reduce((sum, r: any) => sum + r.rating, 0) / food.ratings.length
        : 0,
    }));
    return foodsWithAvg;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const searchFood = async (query: string) => {
  const foods = await Food.find({
    name: { $regex: query, $options: 'i' },
  }).populate("ratings").lean();

  const foodsWithAvg = foods.map((food) => ({
    ...food,
    avg: food.ratings.length
      ? food.ratings.reduce((sum, r: any) => sum + r.rating, 0) / food.ratings.length
      : 0,
  }));

  return foodsWithAvg;
};

export const deleteRecipe = async (recipeId: string, userId: string) => {
  await Like.deleteMany({ targetId: recipeId });
  await Rating.deleteMany({ foodId: recipeId });
  await Comment.deleteMany({ foodId: recipeId });

  const deletedFood = await Food.findByIdAndDelete({ _id: recipeId });

  if (!deletedFood) {
    throw new Error("เมนูที่ต้องการลบไม่มีอยู่ในระบบ");
  }
  return deletedFood;
};
