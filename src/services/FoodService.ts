import Food from "../models/foodModel";
import redis from "../redisClient";

/**
 * สร้างเมนูอาหารใหม่ และล้างแคชที่เกี่ยวข้อง
 */
export const createFood = async (foodData: any) => {
  const newFood = await Food.create(foodData);

  // ล้างแคชเพื่อให้ข้อมูลใหม่อัปเดต
  await redis.del("getAllFoods");
  await redis.del("getAllFoodsRandom");
  await redis.del("getAverageRating");

  return newFood;
};

/**
 * ดึงรายการอาหารทั้งหมด โดยใช้ Redis Cache
 */
export const getAllFoods = async () => {
  const cacheKey = "getAllFoods";

  // ตรวจสอบข้อมูลใน Redis
  const cachedData = await redis.get(cacheKey);
  if (cachedData) {

    return JSON.parse(cachedData);
  }

  // ดึงข้อมูลจาก Database
  const foods = await Food.find().populate("ratings").populate("comments");

  // เก็บข้อมูลลง Redis เป็นเวลา 5 นาที
  await redis.set(cacheKey, JSON.stringify(foods), { EX: 60 * 5 });

  return foods;
};

/**
 * ดึงรายการอาหารแบบสุ่ม โดยใช้ Redis Cache
 */
export const getAllFoodsRandom = async () => {
  const foods = await Food.find().populate("ratings");
  const randomFoods = foods.sort(() => 0.5 - Math.random());
  return randomFoods;
};

/**
 * ดึงข้อมูลอาหารตาม ID
 */
export const getFoodById = async (id: string) => {
  const cacheKey = `food:${id}`;

  // ตรวจสอบข้อมูลใน Redis
  const cachedData = await redis.get(cacheKey);
  if (cachedData) {
    return JSON.parse(cachedData);
  }

  // ดึงข้อมูลจาก Database
  const food = await Food.findById(id);

  // เก็บข้อมูลลง Redis เป็นเวลา 5 นาที
  if (food) {
    await redis.set(cacheKey, JSON.stringify(food), { EX: 60 * 5 });
  }

  return food;
};

/**
 * ดึงรายการอาหารตามประเภท (คาว, หวาน, เครื่องดื่ม) โดยใช้ Redis Cache
 */
export const getFoodsByType = async (type: string) => {
  const cacheKey = `getFoodsByType:${type}`;

  // ตรวจสอบข้อมูลใน Redis
  const cachedData = await redis.get(cacheKey);
  if (cachedData) {
    return JSON.parse(cachedData);
  }

  try {
    let foods: any;
    if (type === "main-course") {
      foods = await Food.find({ category: "อาหารคาว" }).populate("ratings");
    } else if (type === "dessert") {
      foods = await Food.find({ category: "อาหารหวาน" }).populate("ratings");
    } else if (type === "drink") {
      foods = await Food.find({ category: "เครื่องดื่ม" }).populate("ratings");
    } else {
      foods = [];
    }

    // เก็บข้อมูลลง Redis เป็นเวลา 5 นาที
    await redis.set(cacheKey, JSON.stringify(foods), { EX: 60 * 5 });

    return foods;
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * คำนวณคะแนนเฉลี่ยของเมนูอาหาร โดยใช้ Redis Cache
 */
export const getAverageRating = async () => {
  const ratings = await Food.find().populate("ratings");
  if (ratings.length === 0) return 0;

  const avgRating = ratings.reduce((sum, r: any) => sum + r.rating, 0) / ratings.length;

  return avgRating;
};

export const searchFood = async (query: string) => {
  const foods = await Food.find({
    name: { $regex: query, $options: 'i' },
  });

  return foods;
};