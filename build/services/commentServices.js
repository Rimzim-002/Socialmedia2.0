import Comments from '../models/commentsModel.js';
import Messages from '../utils/messagesManager.js';
const createComment = async (attributes) => {
    const { post_id, user_id, content, reply_id } = attributes;
    try {
        // checks comment exis
        if (reply_id !== null) {
            const repliedComment = await Comments.findOne({
                where: { id: reply_id },
            });
            if (!repliedComment) {
                throw new Error(Messages.COMMENT.REPLY_COMMENT_NOT_FOUND);
            }
        }
        const newComment = await Comments.create({
            // new comment
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
    // fetch comment
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
    // comment exist
    try {
        const data = await Comments.findByPk(id);
        return data;
    }
    catch (error) {
        throw new Error(Messages.COMMENT.NOT_FOUND);
    }
};
const destroyComment = async (id) => {
    //delete comment
    try {
        const data = await Comments.update({ is_delete: true }, { where: { id } });
        return data;
    }
    catch (error) {
        throw new Error(Messages.COMMENT.NOT_FOUND);
    }
};
const updateComment = async ({ id, content }) => {
    // update commnet
    try {
        const [data] = await Comments.update({ content }, { where: { id } });
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
