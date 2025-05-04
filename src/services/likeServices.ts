// services/likeService.ts

import Likes from '../models/likesModel.js';
import  {ILike,IFetchLikes}  from '../utils/interfaces/Ilike.js';
import apiResponse from '../utils/apiResponse.js';
 const createLike = async (likeData: ILike) => {

  try {
    const newLike = await Likes.create({
      user_id: likeData.user_id,
      type: likeData.type,
      post_id: likeData.type === 'post' ? likeData.post_id : null,
      comment_id: likeData.type === 'comment' ? likeData.comment_id : null,
    });
     newLike;
  } catch (error) {
    throw error;
  }
};
const getLikes = async (type: 'post' | 'comment', id: string | number) => {
    return Likes.findAll({
      where: type === 'post' ? { post_id: id } : { comment_id: id },
    });
  };
export {createLike,getLikes}