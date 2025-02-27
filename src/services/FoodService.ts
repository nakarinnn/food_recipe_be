import Food from "../models/foodModel";

export const createFood = async (foodData: any) => {
  return await Food.create(foodData);
};

export const getAllFoods = async () => {
  return await Food.find().populate("ingredients").populate("ratings").populate("comments");
};

export const getAllFoodsRandom = async () => {
  const foods = await Food.find().populate("ingredients").populate("ratings").populate("comments");
  return foods.sort(() => 0.5 - Math.random());
};


export const getFoodById = async (id: string) => {
  return await Food.findById(id)
};
