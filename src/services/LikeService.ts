import Like from "../models/likeModel";
import redis from "../redisClient";

export const likeItem = async (userId: string, targetId: string, targetType: "Food" | "Comment") => {
    const existingLike = await Like.findOne({ user: userId, targetId, targetType });

    await redis.del(`getFavoriteMenu:${userId}`);

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
    return await Like.find({ user: userId })
}

export const getFavoriteMenu = async (userId: string) => {
    const cacheKey = `getFavoriteMenu:${userId}`;

    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
        return JSON.parse(cachedData);
    }

    const favmenu = await Like.find({ user: userId, targetType: 'Food' }).populate('targetId').sort({ createdAt: -1 })
    if (favmenu) {
        await redis.set(cacheKey, JSON.stringify(favmenu), "EX", 60 * 5);
    }

    return favmenu
};
