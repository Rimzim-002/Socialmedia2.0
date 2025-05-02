import yup from 'yup';
import { postExist } from '../services/postServices.js';
import { CommentExist, createComment, destroyComment, fetchCommnets, updateComment, } from '../services/commentServices.js';
import apiResponse from '../utils/apiResponse.js';
import { ResponseCode } from '../utils/Enums/responseCode.js';
import Messages from '../utils/messagesManager.js';
const addComment = async (req, res) => {
    const { post_id, user_id, content, reply_id } = req.body;
    const commentSchema = yup.object().shape({
        post_id: yup.string().required('post_id is required'),
        user_id: yup.string().required('user_id is required'),
        reply_id: yup.string().nullable(),
        content: yup
            .string()
            .min(1, 'minimum one character is needed')
            .required('comment is required'),
    });
    try {
        await commentSchema.validate(req.body);
        const isPostExist = await postExist(post_id);
        if (!isPostExist) {
            apiResponse.error(res, {
                status: ResponseCode.NOT_FOUND,
                message: Messages.POST.POST_NOT_FOUND,
                data: {},
            });
        }
        const postdata = { post_id, user_id, content, reply_id };
        const newComment = await createComment(postdata);
        apiResponse.success(res, {
            status: ResponseCode.SUCCESS,
            message: Messages.COMMENT.SUCESS,
            data: { newComment },
        });
    }
    catch (error) {
        apiResponse.error(res, {
            status: ResponseCode.SYSTEM,
            message: Messages.POST.POST_NOT_FOUND,
            data: { error },
        });
    }
};
const getAllcomments = async (req, res) => {
    const { post_id } = req.body;
    const commentSchema = yup.object().shape({
        post_id: yup.string().required('post_id is required'),
    });
    try {
        await commentSchema.validate(req.body, { abortEarly: false });
        const isPostExist = await postExist(post_id);
        if (!isPostExist) {
            apiResponse.error(res, {
                status: ResponseCode.NOT_FOUND,
                message: Messages.POST.POST_NOT_FOUND,
                data: {},
            });
        }
        const getComments = await fetchCommnets(post_id);
        apiResponse.success(res, {
            status: ResponseCode.SUCCESS,
            message: Messages.POST.POST_FOUND,
            data: getComments,
        });
    }
    catch (error) {
        apiResponse.error(res, {
            status: ResponseCode.SYSTEM,
            message: Messages.SYSTEM.SERVER_ERROR,
            data: {},
        });
    }
};
const deletecommnet = async (req, res) => {
    const { id } = req.body;
    const dltSchema = yup.object({
        id: yup.string().required('delete id is required').required(),
    });
    try {
        await dltSchema.validate(req.body, { abortEarly: false });
        const isCommentexist = await CommentExist(id);
        if (!isCommentexist) {
            res
                .status(ResponseCode.FORBIDDEN)
                .json({ Messages: Messages.COMMENT.NOT_FOUND });
        }
        const deleteComment = await destroyComment(id);
        res
            .status(ResponseCode.SUCCESS)
            .json({ Messages: Messages.COMMENT.COMMENT_DELETE, data: {} });
    }
    catch (error) {
        res
            .status(ResponseCode.SYSTEM)
            .json({ message: Messages.COMMENT.COMMENT_DLT_FAILED });
    }
};
const updatecomment = async (req, res) => {
    const { id, ...updatedata } = req.body;
    const SignuSchema = yup.object({
        id: yup.string().required('commnet id is required').required(),
    });
    try {
        await SignuSchema.validate(req.body, { abortEarly: false });
        const isCommentexist = await CommentExist(id);
        if (!isCommentexist) {
            res
                .status(ResponseCode.FORBIDDEN)
                .json({ Messages: Messages.COMMENT.NOT_FOUND });
        }
        const updateData = { id, updatedata };
        const updatedComment = await updateComment(updateData);
        res.status(ResponseCode.SUCCESS).json({
            Messages: Messages.USER.SIGNUP_SUCCESS,
            data: { updatedComment },
        });
    }
    catch (error) {
        apiResponse.error(res, {
            status: ResponseCode.SYSTEM,
            message: Messages.COMMENT.COMMENT_UPD_FAILED,
            data: { error },
        });
    }
};
const getComment = async (req, res) => {
    const { id } = req.body;
    const SignuSchema = yup.object({
        id: yup.string().required('commnet id is required').required(),
    });
    try {
        await SignuSchema.validate(req.body, { abortEarly: false });
        const isCommentexist = await CommentExist(id);
        if (!isCommentexist) {
            res
                .status(ResponseCode.FORBIDDEN)
                .json({ Messages: Messages.COMMENT.NOT_FOUND });
        }
        res
            .status(ResponseCode.SUCCESS)
            .json({ Messages: Messages.COMMENT.SUCESS, data: { isCommentexist } });
    }
    catch (error) {
        apiResponse.error(res, {
            status: ResponseCode.SYSTEM,
            message: Messages.COMMENT.COMMENT_DLT_FAILED,
            data: { error },
        });
    }
};
export { addComment, getAllcomments, deletecommnet, updatecomment, getComment };
