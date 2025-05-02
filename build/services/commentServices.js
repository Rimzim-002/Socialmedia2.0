import Comments from '../models/commentsModel.js';
import Messages from '../utils/messagesManager.js';
const createComment = async (attributes) => {
    const { post_id, user_id, content, reply_id } = attributes;
    try {
        if (reply_id !== 0) {
            const repliedcomment = await Comments.findOne({
                where: { id: reply_id },
            });
            if (!repliedcomment) {
            }
        }
        const newComment = await Comments.create({
            post_id,
            user_id,
            content,
            reply_id: reply_id ? reply_id : null,
        });
        return newComment;
    }
    catch (error) {
        throw new Error(Messages.COMMENT.ERROR);
    }
};
const fetchCommnets = async (post_id) => {
    try {
        const postComments = await Comments.findAll({
            where: { post_id, is_delete: false },
        });
        if (!postComments) {
            throw new Error(Messages.POST.POST_NOT_FOUND);
        }
        return postComments;
    }
    catch (error) {
        throw new Error(Messages.POST.POST_NOT_FOUND);
    }
};
const CommentExist = async (id) => {
    try {
        const data = await Comments.findByPk(id);
        return data;
    }
    catch (error) {
        throw new Error(Messages.COMMENT.NOT_FOUND);
    }
};
const destroyComment = async (id) => {
    try {
        const data = await Comments.update({ is_delete: true }, { where: { id } });
        return data;
    }
    catch (error) {
        throw new Error(Messages.COMMENT.NOT_FOUND);
    }
};
const updateComment = async (attributes) => {
    const { id, updatedata } = attributes;
    try {
        const data = await Comments.update(updatedata, { where: { id } });
        if (data) {
            const update = await Comments.findOne({ where: { id: id } });
            return update;
        }
    }
    catch (error) {
        throw new Error(Messages.COMMENT.FETCH_SUCCESS);
    }
};
export { createComment, fetchCommnets, CommentExist, destroyComment, updateComment, };
