// services/likeService.ts

import Likes from '../models/likesModel.js';
import { ILike, IFetchLikes } from '../utils/interfaces/Ilike.js';
import Messages from '../utils/messagesManager.js';
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
const getLikes = async (attributes: IFetchLikes) => {
  const { type, post_id, comment_id } = attributes;
  try {
    const likes = await Likes.findAll({
      where: type === 'post' ? { post_id } : { comment_id },
    });
    return likes;
  } catch (error) {
    throw new Error('Failed to fetch likes');
  }
};
export { createLike, getLikes };
