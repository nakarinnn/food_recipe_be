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

export const getFoodsByType = async (type: string) => {
  try {
    if (type === "main-course") {
      return await Food.find({ category: "อาหารคาว" });
    } else if (type === "dessert") {
      return await Food.find({ category: "อาหารหวาน" });
    } else if (type === "drink") {
      return await Food.find({ category: "เครื่องดื่ม" });
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
