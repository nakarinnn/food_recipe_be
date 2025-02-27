import Comment from "../models/commentModel";

export const createComment = async (commentData: any) => {
  return await Comment.create(commentData);
};

export const getCommentsByFoodId = async (foodId: string) => {
  return await Comment.find({ foodId }).sort({ createdAt: -1 });
};
