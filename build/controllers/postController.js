import { findUSer, postAvail, postData, postExist, postUpdate, postdelete, userposts, } from '../services/postServices.js';
import yup from 'yup';
import { ResponseCode } from '../utils/Enums/responseCode.js';
import Messages from '../utils/messagesManager.js';
import apiResponse from '../utils/apiResponse.js';
const addPost = async (req, res) => {
    const { user_id, image, caption } = req.body;
    const addPostSchema = yup.object().shape({
        image: yup.string().required('Image is required'),
        caption: yup
            .string()
            .required('Caption is required')
            .min(20, 'Caption must be at least 2 characters'),
        user_id: yup.string().required(`UserID is required`),
    });
    try {
        await addPostSchema.validate(req.body, { abortEarly: false });
        // Check if user exist
        const isUserExist = await findUSer(user_id);
        if (!isUserExist) {
            apiResponse.error(res, {
                status: ResponseCode.BAD_REQUEST,
                message: Messages.USER.USER_NOT_EXIST,
                data: {},
            });
        }
        const data = { user_id, image, caption };
        const createPost = await postData(data);
        apiResponse.success(res, {
            status: ResponseCode.SUCCESS,
            message: Messages.POST.POST_CREATED_SUCESS,
            data: { createPost },
        });
    }
    catch (error) {
        apiResponse.error(res, {
            status: ResponseCode.SYSTEM,
            message: Messages.POST.POST_CREATED_FAILED,
            data: { error },
        });
    }
};
const upatePost = async (req, res) => {
    const { id, ...updateFields } = req.body;
    try {
        const isPostExist = await postExist(id);
        if (!isPostExist) {
            apiResponse.error(res, {
                status: ResponseCode.BAD_REQUEST,
                message: Messages.POST.POST_NOT_FOUND,
                data: {},
            });
        }
        const updatedPost = await postUpdate({ id, updateData: updateFields });
        apiResponse.success(res, {
            status: ResponseCode.SUCCESS,
            message: Messages.POST.POST_UPDATED_SUCCESS,
            data: { updatedPost },
        });
    }
    catch (error) {
        apiResponse.error(res, {
            status: ResponseCode.SYSTEM,
            message: Messages.POST.POST_UPDATED_FAIL,
            data: { error },
        });
    }
};
const deletePost = async (req, res) => {
    const { id } = req.body;
    try {
        const isPostExist = await postExist(id);
        if (!isPostExist) {
            res.status(ResponseCode.BAD_REQUEST).json({
                status: ResponseCode.BAD_REQUEST,
                Messages: Messages.USER.POST_NOT_FOUND,
            });
        }
        const deletedPost = await postdelete(id);
        apiResponse.success(res, {
            status: ResponseCode.SUCCESS,
            message: Messages.POST.POST_DELETE_SUCCESS,
            data: {},
        });
    }
    catch (error) {
        apiResponse.error(res, {
            status: ResponseCode.SYSTEM,
            message: Messages.POST.POST_DELETE_FAIL,
            data: { error },
        });
    }
};
const allPosts = async (req, res) => {
    const { user_id } = req.body;
    try {
        const isUserExist = await findUSer(user_id);
        if (!isUserExist) {
            apiResponse.error(res, {
                status: ResponseCode.BAD_REQUEST,
                message: Messages.USER.USER_NOT_EXIST,
                data: {},
            });
        }
        const userAllPosts = await userposts(user_id);
        if (userAllPosts) {
            apiResponse.success(res, {
                status: ResponseCode.SUCCESS,
                message: Messages.POST.ALL_POSTS,
                data: { userAllPosts },
            });
        }
    }
    catch (error) {
        apiResponse.error(res, {
            status: ResponseCode.SYSTEM,
            message: Messages.POST.POST_NOT_FOUND,
            data: { error },
        });
    }
};
const userPost = async (req, res) => {
    const { user_id, id } = req.body;
    try {
        const isUserExist = await findUSer(user_id);
        if (!isUserExist) {
            apiResponse.error(res, {
                status: ResponseCode.BAD_REQUEST,
                message: Messages.USER.USER_NOT_EXIST,
                data: {},
            });
        }
        const userPost = await postAvail(id);
        if (userPost) {
            apiResponse.success(res, {
                status: ResponseCode.SUCCESS,
                message: Messages.POST.ALL_POSTS,
                data: { userPost },
            });
        }
    }
    catch (error) {
        apiResponse.error(res, {
            status: ResponseCode.SYSTEM,
            message: Messages.POST.POST_NOT_FOUND,
            data: { error },
        });
    }
};
export { addPost, upatePost, deletePost, allPosts, userPost };
