import { error } from 'console';
import Posts from '../models/postModel.js';
import Users from '../models/userModel.js';
const findUSer = async (userID) => {
    const isUserExist = await Users.findOne({
        where: { id: userID },
    });
    if (isUserExist) {
        return isUserExist;
    }
    else {
        throw error;
    }
};
const postData = async (attributes) => {
    const { user_id, image, caption } = attributes;
    const createNewPost = await Posts.create({
        user_id,
        image,
        caption,
    });
    if (createNewPost) {
        return createNewPost;
    }
    else {
        throw error;
    }
};
const postExist = async (postId) => {
    const isPostExist = await Posts.findByPk(postId);
    if (isPostExist) {
        return isPostExist;
    }
    throw new Error('Post not found');
};
const postAvail = async (postId) => {
    const isPostExist = await Posts.findOne({
        where: { id: postId, is_delete: false },
    });
    if (isPostExist) {
        return isPostExist;
    }
    throw new Error('Post not found');
};
const postUpdate = async (attributes) => {
    const { id, updateData } = attributes;
    const updatedCount = await Posts.update(updateData, { where: { id } });
    if (updatedCount) {
        const updatedPost = await Posts.findOne({ where: { id } });
        return updatedPost;
    }
    throw new Error('Post not updated');
};
const postdelete = async (id) => {
    const deletePost = await Posts.update({ is_delete: true }, { where: { id } });
    return deletePost;
};
const userposts = async (user_id) => {
    const data = await Posts.findAll({
        where: { user_id: user_id, is_delete: false },
    });
    return data;
};
export { findUSer, postData, postExist, postUpdate, postdelete, userposts, postAvail, };
