// services/likeService.ts
import Likes from '../models/likesModel.js';
const createLike = async (likeData) => {
    try {
        const newLike = await Likes.create({
            user_id: likeData.user_id,
            type: likeData.type,
            post_id: likeData.type === 'post' ? likeData.post_id : null,
            comment_id: likeData.type === 'comment' ? likeData.comment_id : null,
        });
        return newLike;
    }
    catch (error) {
        throw error;
    }
};
export default createLike;
