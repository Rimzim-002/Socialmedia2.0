import {
  findUSer,
  postAvail,
  postData,
  postExist,
  postUpdate,
  postdelete,
  userposts,
} from '../services/postServices.js';
import yup from 'yup';
import { ResponseCode } from '../utils/Enums/responseCode.js';
import Messages from '../utils/messagesManager.js';
import { Response, Request } from 'express';
import apiResponse from '../utils/apiResponse.js';
import { Ipost, PostUpdate } from '../utils/interfaces/Ipost.js';
import { validateRequest } from '../utils/validateRequest.js';
import {
  addPostSchema,
  updatePostSchema,
  deletePostSchema,
  singlePostSchema,
  userPostsSchema,
} from '../utils/Validations/postValidationschemas.js';
// Add post
const addPost = async (req: Request, res: Response) => {
  const { user_id, image, caption } = req.body as Ipost;

  try {
    await validateRequest(addPostSchema, req.body); // validaion
    // Check if user exist
    const isUserExist = await findUSer(user_id);
    if (!isUserExist) {
      apiResponse.error(res, {
        status: ResponseCode.BAD_REQUEST,
        message: Messages.USER.USER_NOT_EXIST,
        data: {},
      });
    }
    const data: Ipost = { user_id, image, caption };
    const createPost = await postData(data); // creating post
    apiResponse.success(res, {
      status: ResponseCode.SUCCESS,
      message: Messages.POST.POST_CREATED_SUCESS,
      data: { createPost },
    });
  } catch (error: any) {
    // Handling  the validation errors centrally
    if (error instanceof yup.ValidationError) {
      const simplifiedErrors = error.inner.map((err: any) => ({
        field: err.path,
        message: err.message,
      }));

      apiResponse.error(res, {
        status: 400,
        message: Messages.VALIDATION.INVALID_INPUT,
        data: simplifiedErrors,
      });
    }
    // Handling the  validation errors on server

    apiResponse.error(res, {
      status: ResponseCode.SYSTEM,
      message: Messages.POST.POST_CREATED_FAILED,
      data: { error: error.message },
    });
  }
};

// Update post
const upatePost = async (req: Request, res: Response) => {
  const { user_id, id, ...updateFields } = req.body as PostUpdate;

  try {
    await validateRequest(updatePostSchema, req.body); // validation
    // check user exist
    const isUserExist = await findUSer(user_id);
    if (!isUserExist) {
      apiResponse.error(res, {
        status: ResponseCode.BAD_REQUEST,
        message: Messages.USER.USER_NOT_EXIST,
        data: {},
      });
    }
    // check post exist
    const isPostExist = await postExist(id);
    if (!isPostExist) {
      apiResponse.error(res, {
        status: ResponseCode.BAD_REQUEST,
        message: Messages.POST.POST_NOT_FOUND,
        data: {},
      });
    }

    const updatedPost = await postUpdate({
      id,
      user_id,
      updateData: updateFields as Partial<Ipost>,
    });

    // upate the post

    apiResponse.success(res, {
      status: ResponseCode.SUCCESS,
      message: Messages.POST.POST_UPDATED_SUCCESS,
      data: { updatedPost },
    });
  } catch (error: any) {
    // Handling  the validation errors centrally
    if (error instanceof yup.ValidationError) {
      const simplifiedErrors = error.inner.map((err: any) => ({
        field: err.path,
        message: err.message,
      }));

      apiResponse.error(res, {
        status: 400,
        message: 'Validation failed',
        data: simplifiedErrors,
      });
    }
    // Handling the  validation errors on server

    apiResponse.error(res, {
      status: ResponseCode.SYSTEM,
      message: Messages.POST.POST_UPDATED_FAIL,
      data: { error: error.message },
    });
  }
};
// Delete the pot
const deletePost = async (req: Request, res: Response) => {
  const { id, user_id } = req.body;

  try {
    await validateRequest(deletePostSchema, req.body); // validation
    const isUserExist = await findUSer(user_id); // user exist
    if (!isUserExist) {
      apiResponse.error(res, {
        status: ResponseCode.BAD_REQUEST,
        message: Messages.USER.USER_NOT_EXIST,
        data: {},
      });
    }
    const isPostExist = await postExist(id); // post exist
    if (!isPostExist) {
      res.status(ResponseCode.BAD_REQUEST).json({
        status: ResponseCode.BAD_REQUEST,
        Messages: Messages.USER.POST_NOT_FOUND,
      });
    }
    const deletedPost = await postdelete(id); // delete post
    apiResponse.success(res, {
      status: ResponseCode.SUCCESS,
      message: Messages.POST.POST_DELETE_SUCCESS,
      data: {},
    });
  } catch (error: any) {
    // Handling  the validation errors centrally
    if (error instanceof yup.ValidationError) {
      const simplifiedErrors = error.inner.map((err: any) => ({
        field: err.path,
        message: err.message,
      }));

      apiResponse.error(res, {
        status: 400,
        message: Messages.VALIDATION.INVALID_INPUT,
        data: simplifiedErrors,
      });
    }
    // Handling the  validation errors on server

    apiResponse.error(res, {
      status: ResponseCode.SYSTEM,
      message: Messages.POST.POST_DELETE_FAIL,
      data: { error: error.message },
    });
  }
};
// user's all posts
const allPosts = async (req: Request, res: Response) => {
  const { user_id } = req.body;

  try {
    await validateRequest(userPostsSchema, req.body);
    const isUserExist = await findUSer(user_id); // validation
    if (!isUserExist) {
      apiResponse.error(res, {
        status: ResponseCode.BAD_REQUEST,
        message: Messages.USER.USER_NOT_EXIST,
        data: {},
      });
    }

    const userAllPosts = await userposts(user_id); // fetch  users all  posts
    if (userAllPosts) {
      apiResponse.success(res, {
        status: ResponseCode.SUCCESS,
        message: Messages.POST.ALL_POSTS,
        data: { userAllPosts },
      });
    }
  } catch (error: any) {
    // Handling  the validation errors centrally
    if (error instanceof yup.ValidationError) {
      const simplifiedErrors = error.inner.map((err: any) => ({
        field: err.path,
        message: err.message,
      }));

      apiResponse.error(res, {
        status: 400,
        message: Messages.VALIDATION.INVALID_INPUT,
        data: simplifiedErrors,
      });
    }
    // Handling the  validation errors on server

    apiResponse.error(res, {
      status: ResponseCode.SYSTEM,
      message: Messages.SYSTEM.SERVER_ERROR,
      data: { error: error.message },
    });
  }
};
//single  post
const userPost = async (req: Request, res: Response) => {
  const { user_id, id } = req.body;

  try {
    await validateRequest(singlePostSchema, req.body); // validation
    const isUserExist = await findUSer(user_id);
    if (!isUserExist) {
      apiResponse.error(res, {
        status: ResponseCode.BAD_REQUEST,
        message: Messages.USER.USER_NOT_EXIST,
        data: {},
      });
    }

    const userPost = await postAvail(id); //single post
    if (userPost) {
      apiResponse.success(res, {
        status: ResponseCode.SUCCESS,
        message: Messages.POST.ALL_POSTS,
        data: { userPost },
      });
    }
  } catch (error: any) {
    // Handling  the validation errors centrally
    if (error instanceof yup.ValidationError) {
      const simplifiedErrors = error.inner.map((err: any) => ({
        field: err.path,
        message: err.message,
      }));

      apiResponse.error(res, {
        status: 400,
        message: Messages.VALIDATION.INVALID_INPUT,
        data: simplifiedErrors,
      });
    }
    // Handling the  validation errors on server

    apiResponse.error(res, {
      status: ResponseCode.SYSTEM,
      message: Messages.SYSTEM.SERVER_ERROR,
      data: { error: error.message },
    });
  }
};
export { addPost, upatePost, deletePost, allPosts, userPost };
