import Food from "../models/foodModel";

export const createFood = async (foodData: any) => {
  return await Food.create(foodData);
};

export const getAllFoods = async () => {
  return await Food.find().populate("ratings").populate("comments");
};

export const getAllFoodsRandom = async () => {
  const foods = await Food.find().populate("ratings")
  return foods.sort(() => 0.5 - Math.random());
};


export const getFoodById = async (id: string) => {
  return await Food.findById(id)
};

export const getFoodsByType = async (type: string) => {
  try {
    if (type === "main-course") {
      return await Food.find({ category: "อาหารคาว" }).populate("ratings");
    } else if (type === "dessert") {
      return await Food.find({ category: "อาหารหวาน" }).populate("ratings");
    } else if (type === "drink") {
      return await Food.find({ category: "เครื่องดื่ม" }).populate("ratings");
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getAverageRating = async () => {
  const ratings = await Food.find().populate("ratings");
  if (ratings.length === 0) return 0;
  return ratings.reduce((sum, r: any) => sum + r.rating, 0) / ratings.length;
}