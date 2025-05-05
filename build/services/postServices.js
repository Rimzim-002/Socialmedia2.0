import Posts from '../models/postModel.js';
import Users from '../models/userModel.js';
import Messages from '../utils/messagesManager.js';
const findUSer = async (userID) => {
    try {
        const isUserExist = await Users.findOne({
            where: { id: userID },
        });
        if (isUserExist) {
            return isUserExist;
        }
    }
    catch (error) {
        throw new Error(Messages.POST.POST_NOT_FOUND);
    }
};
const postData = async (attributes) => {
    try {
        const { user_id, image, caption } = attributes;
        const createNewPost = await Posts.create({
            user_id,
            image,
            caption,
        });
        return createNewPost.get();
    }
    catch (error) {
        throw new Error(error);
    }
};
const postExist = async (postId) => {
    try {
        const isPostExist = await Posts.findByPk(postId);
        if (isPostExist) {
            return isPostExist;
        }
    }
    catch (error) {
        throw new Error(Messages.POST.POST_NOT_FOUND);
    }
};
const postAvail = async (postId) => {
    try {
        const isPostExist = await Posts.findOne({
            where: { id: postId, is_delete: false },
        });
        if (isPostExist) {
            return isPostExist;
        }
    }
    catch (error) {
        throw new Error(Messages.POST.POST_NOT_FOUND);
    }
};
const postUpdate = async (attributes) => {
    try {
        const { id, updateData } = attributes;
        const [updatedCount] = await Posts.update(updateData, { where: { id } });
        if (updatedCount > 0) {
            const updatedPost = await Posts.findOne({ where: { id } });
            return updatedPost;
        }
    }
    catch (error) {
        throw new Error(Messages.VALIDATION.INVALID_INPUT);
    }
};
const postdelete = async (id) => {
    try {
        const [updatedrows] = await Posts.update({ is_delete: true }, { where: { id } });
        if (updatedrows > 0) {
            return { message: Messages.POST.POST_DELETE_SUCCESS };
        }
        else {
            throw new Error(Messages.POST.POST_CREATED_FAILED);
        }
    }
    catch (error) {
        throw new Error(error.message || Messages.POST.POST_CREATED_FAILED);
    }
};
const userposts = async (user_id) => {
    try {
        const posts = await Posts.findAll({
            where: {
                user_id,
                is_delete: false,
            },
        });
        return posts;
    }
    catch (error) {
        throw new Error(error.message || Messages.POST.POST_UPDATED_FAIL);
    }
};
export { findUSer, postData, postExist, postUpdate, postdelete, userposts, postAvail, };
