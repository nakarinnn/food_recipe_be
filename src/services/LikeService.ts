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
}

export const isLiked = async (userId: string, targetId: string, targetType: "Food" | "Comment") => {
    return await Like.exists({ user: userId, targetId, targetType });
}

export const countLikes = async (targetId: string, targetType: "Food" | "Comment") => {
    return await Like.countDocuments({ targetId, targetType });
}

export const getUserLikes = async (userId: string) => {
    return await Like.find({ user: userId }).select("targetId");
}