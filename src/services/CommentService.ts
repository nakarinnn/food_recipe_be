import mongoose from "mongoose";
import Comment from "../models/commentModel";

export const createComment = async (foodId: string, userId: string, text: string) => {
  const newComment = await Comment.create({ foodId, userId, text });
  return newComment;
};

export const getCommentsByFoodId = async (foodId: string) => {
  const comments = await Comment.aggregate([
    {
      $match: { foodId: new mongoose.Types.ObjectId(foodId) },
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "userDetails",
      },
    },
    {
      $unwind: "$userDetails",
    },
    {
      $sort: { createdAt: -1 },
    },
  ]);

  return comments;
};

export const editComment = async (commentId: string, text: string) => {
  const comment = await Comment.findByIdAndUpdate(commentId, { text }, { new: true });

  return comment;
};

export const deleteComment = async (commentId: string) => {
  const comment = await Comment.findByIdAndDelete(commentId);
  return comment;
};
