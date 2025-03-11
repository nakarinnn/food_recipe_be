import Comment from "../models/commentModel";

export const createComment = async (foodId: string, userId: string, text: string) => {
  return await Comment.create({foodId, userId, text});
};

export const getCommentsByFoodId = async (foodId: string) => {
  return await Comment.find({ foodId }).populate("userId", '_id name email avatar_url').sort({ createdAt: -1 });
};

export const editComment = async (commentId: string, text: string) => {
  return await Comment.findByIdAndUpdate(commentId, { text }, { new: true });
};

export const deleteComment = async (commentId: string) => {
  return await Comment.findByIdAndDelete(commentId);
};

