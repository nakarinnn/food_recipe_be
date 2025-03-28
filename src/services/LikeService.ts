import mongoose from "mongoose";
import Like from "../models/likeModel";

export const likeItem = async (userId: string, targetId: string, targetType: "Food" | "Comment") => {
  const existingLike = await Like.findOne({ user: userId, targetId, targetType });

  if (existingLike) {
    await Like.deleteOne({ _id: existingLike._id });
    return { liked: false, message: "Unlike successful" };
  } else {
    await Like.create({ user: userId, targetId, targetType });
    return { liked: true, message: "Like successful" };
  }
};

export const getUserLikes = async (userId: string) => {
  const likes = await Like.find({ user: userId });
  return likes;
};

export const getFavoriteMenu = async (userId: string) => {
  try {
    const likeWithAvg = await Like.aggregate([
      {
        $match: { user: new mongoose.Types.ObjectId(userId), targetType: "Food" },
      },
      {
        $lookup: {
          from: "foods",
          localField: "targetId",
          foreignField: "_id",
          as: "new_targetId",
        },
      },
      { $unwind: "$new_targetId" },
      {
        $lookup: {
          from: "rating",
          localField: "new_targetId.ratings",
          foreignField: "_id",
          as: "new_targetId.ratingDetails",
        },
      },
      { $sort: { createdAt: -1 } },
    ]);

    const likeWithAvgDetail = likeWithAvg.map((item) => ({
      _id: item.new_targetId._id,
      name: item.new_targetId.name,
      description: item.new_targetId.description,
      image: item.new_targetId.image,
      cookTime: item.new_targetId.cookTime,
      ratings: item.new_targetId.ratingDetails || [],
    }));

    const likeWithAvgDetailavg = likeWithAvgDetail.map((l: any) => ({
      ...l,
      avg: l.ratings.length
        ? l.ratings.reduce((sum: number, r: any) => sum + (r.rating || 0), 0) / l.ratings.length
        : 0,
    }));

    return likeWithAvgDetailavg; 
  } catch (err) {
    console.log(err);
    throw new Error("Error fetching favorite menu");
  }
};

