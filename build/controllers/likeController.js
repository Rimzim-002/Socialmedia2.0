import apiResponse from '../utils/apiResponse.js';
import { ResponseCode } from '../utils/Enums/responseCode.js';
import Messages from '../utils/messagesManager.js';
import Likes from '../models/likesModel.js';
import Posts from '../models/postModel.js';
import Comments from '../models/commentsModel.js';
import { findUSer } from '../services/postServices.js';
import { createLike, getLikes } from '../services/likeServices.js';
import addLikeSchema from '../utils/Validations/likeValidation.js';
const addLike = async (req, res) => {
    const { user_id, type, post_id, comment_id } = req.body;
    try {
        await addLikeSchema.validate(req.body, { abortEarly: false }); // validation
        //  Check if user exists
        const isUserExist = await findUSer(user_id);
        if (!isUserExist) {
            apiResponse.error(res, {
                status: ResponseCode.BAD_REQUEST,
                message: Messages.USER.USER_NOT_EXIST,
                data: {},
            });
        }
        // Check the type is post or comment
        if (type !== 'post' && type !== 'comment') {
            apiResponse.error(res, {
                status: ResponseCode.BAD_REQUEST,
                message: Messages.VALIDATION.INVALID_INPUT,
                data: {},
            });
        }
        //  Check if the post or comment exists
        let isTermExist = false;
        if (type === 'post' && post_id) {
            const post = await Posts.findByPk(post_id);
            if (post) {
                isTermExist = true;
            }
        }
        else if (type === 'comment' && comment_id) {
            const comment = await Comments.findByPk(comment_id);
            if (comment) {
                isTermExist = true;
            }
        }
        if (!isTermExist) {
            apiResponse.error(res, {
                status: ResponseCode.NOT_FOUND,
                message: type === 'post'
                    ? Messages.POST.POST_NOT_FOUND
                    : Messages.COMMENT.NOT_FOUND,
                data: {},
            });
        }
        //  Check already liked the post or comment
        const isLikeExist = await Likes.findOne({
            where: {
                user_id,
                type,
                [type === 'post' ? 'post_id' : 'comment_id']: type === 'post' ? post_id : comment_id,
            },
        });
        if (isLikeExist) {
            apiResponse.error(res, {
                status: ResponseCode.BAD_REQUEST,
                message: Messages.LIKE.ALREADY_LIKE,
                data: {},
            });
        }
        const data = {
            user_id,
            type,
            post_id: type === 'post' ? post_id : null,
            comment_id: type === 'comment' ? comment_id : null,
            status: 'like',
        };
        const createdLike = await createLike(data);
        apiResponse.success(res, {
            status: ResponseCode.SUCCESS,
            message: Messages.LIKE.CREATED_SUCCESSFULLY,
            data: { createdLike },
        });
    }
    catch (error) {
        console.error(error);
        apiResponse.error(res, {
            status: ResponseCode.SYSTEM,
            message: Messages.LIKE.ERROR,
            data: { error: error.message },
        });
    }
};
const fetchLikes = async (req, res) => {
    const { type, post_id, comment_id } = req.body;
    try {
        if (type !== 'post' && type !== 'comment') {
            apiResponse.error(res, {
                status: ResponseCode.BAD_REQUEST,
                message: Messages.VALIDATION.INVALID_INPUT,
                data: {},
            });
        }
        const id = type === 'post' ? post_id : comment_id;
        if (!id) {
            apiResponse.error(res, {
                status: ResponseCode.BAD_REQUEST,
                message: Messages.SYSTEM.SERVER_ERROR,
                data: {},
            });
        }
        const validId = id;
        //  fetch likes
        const likes = await getLikes({ type, post_id, comment_id });
        apiResponse.success(res, {
            status: ResponseCode.SUCCESS,
            message: Messages.LIKE.FETCH_SUCCESS,
            data: { count: likes.length, likes },
        });
    }
    catch (error) {
        console.error(error);
        apiResponse.error(res, {
            status: ResponseCode.SYSTEM,
            message: Messages.SYSTEM.SERVER_ERROR,
            data: { error: error.message },
        });
    }
};
export { addLike, fetchLikes };
