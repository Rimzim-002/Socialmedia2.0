import { error } from 'console';
import Posts from '../models/postModel.js';
import Users from '../models/userModel.js';
import { Ipost, PostUpdate } from '../utils/interfaces/Ipost.js';
import Messages from '../utils/messagesManager.js';

const findUSer = async (userID: string | number) => {
  try {
    const isUserExist = await Users.findOne({
      where: { id: userID },
    });

    if (isUserExist) {
      return isUserExist;
    }
  } catch (error: any) {
    throw new Error(Messages.POST.POST_NOT_FOUND);
  }
};

const postData = async (attributes: Ipost) => {
  try {
    const { user_id, image, caption } = attributes;
    const createNewPost = await Posts.create({
      user_id,
      image,
      caption,
    });

    return createNewPost.get();
  } catch (error: any) {
    throw new Error(error);
  }
};
const postExist = async (postId: string | number) => {
  try {
    const isPostExist = await Posts.findByPk(postId);
    if (isPostExist) {
      return isPostExist;
    }
  } catch (error: any) {
    throw new Error(Messages.POST.POST_NOT_FOUND);
  }
};

const postAvail = async (postId: string | number) => {
  try {
    const isPostExist = await Posts.findOne({
      where: { id: postId, is_delete: false },
    });

    if (isPostExist) {
      return isPostExist;
    }
  } catch (error: any) {
    throw new Error(Messages.POST.POST_NOT_FOUND);
  }
};

const postUpdate = async (attributes: PostUpdate) => {
  try {
    const { id, updateData } = attributes;

    const [updatedCount] = await Posts.update(updateData, { where: { id } });

    if (updatedCount > 0) {
      const updatedPost = await Posts.findOne({ where: { id } });
      return updatedPost;
    }
  } catch (error: any) {
    throw new Error(Messages.VALIDATION.INVALID_INPUT);
  }
};

const postdelete = async (id: string) => {
  try {
    const [updatedrows] = await Posts.update(
      { is_delete: true },
      { where: { id } },
    );

    if (updatedrows > 0) {
      return { message: Messages.POST.POST_DELETE_SUCCESS };
    } else {
      throw new Error(Messages.POST.POST_CREATED_FAILED);
    }
  } catch (error: any) {
    throw new Error(error.message || Messages.POST.POST_CREATED_FAILED);
  }
};

const userposts = async (user_id: string | number) => {
  try {
    const posts = await Posts.findAll({
      where: {
        user_id,
        is_delete: false,
      },
    });

    return posts;
  } catch (error: any) {
    throw new Error(error.message || Messages.POST.POST_UPDATED_FAIL);
  }
};

export {
  findUSer,
  postData,
  postExist,
  postUpdate,
  postdelete,
  userposts,
  postAvail,
};
