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

export const getUserLikes = async (userId: string) => {
    return await Like.find({ user: userId })
}

export const getFavoriteMenu = async (userId: string) => {
    const favmenu = await Like.find({ user: userId, targetType: 'Food' }).populate('targetId').sort({ createdAt: -1 })
    const filteredFavMenu = favmenu.filter(item => item.targetId !== null);

    return filteredFavMenu
};
