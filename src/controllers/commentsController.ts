import { Request, Response } from 'express';
import yup from 'yup';
import { findUSer, postAvail, postExist } from '../services/postServices.js';
import {
  CommentExist,
  createComment,
  destroyComment,
  fetchCommnets,
  updateComment,
} from '../services/commentServices.js';
import {
  commentSchema,
  getAllCommentsSchema,
  deleteCommentSchema,
  updateCommentSchema,
  getCommentSchema,
} from '../utils/Validations/commnetsvalidation.js';
import apiResponse from '../utils/apiResponse.js';
import { ResponseCode } from '../utils/Enums/responseCode.js';
import Messages from '../utils/messagesManager.js';
import {
  IAddComment,
  IDeleteComment,
  IGetComments,
  IGetSingleComment,
  IUpdateComment,
} from '../utils/interfaces/Icomment.js';
// add comment
const addComment = async (req: Request, res: Response) => {
  const { post_id, user_id, content, reply_id } = req.body as IAddComment;

  try {
    await commentSchema.validate(req.body); // validation
    const isUserExist = await findUSer(user_id); // check user exist
    if (!isUserExist) {
      apiResponse.error(res, {
        status: ResponseCode.BAD_REQUEST,
        message: Messages.USER.USER_NOT_EXIST,
        data: {},
      });
    }
    const isPostExist = await postExist(post_id); // check  post exist
    if (!isPostExist) {
      apiResponse.error(res, {
        status: ResponseCode.NOT_FOUND,
        message: Messages.POST.POST_NOT_FOUND,
        data: {},
      });
    }

    const newComment = await createComment(req.body); // create commnet

    apiResponse.success(res, {
      status: ResponseCode.SUCCESS,
      message: Messages.COMMENT.SUCESS,
      data: { newComment },
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
// get all comments
const getAllcomments = async (req: Request, res: Response) => {
  const { post_id, user_id } = req.body as IGetComments;

  try {
    await getAllCommentsSchema.validate(req.body, { abortEarly: false }); //validation
    const isUserExist = await findUSer(user_id); // check user  exist
    if (!isUserExist) {
      apiResponse.error(res, {
        status: ResponseCode.BAD_REQUEST,
        message: Messages.USER.USER_NOT_EXIST,
        data: {},
      });
    }
    const isPostExist = await postExist(post_id); // checks  post   exist
    if (!isPostExist) {
      apiResponse.error(res, {
        status: ResponseCode.NOT_FOUND,
        message: Messages.POST.POST_NOT_FOUND,
        data: {},
      });
    }
    const getComments = await fetchCommnets(post_id); // fetch comments
    apiResponse.success(res, {
      status: ResponseCode.SUCCESS,
      message: Messages.POST.POST_FOUND,
      data: { getComments },
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
//delete comment
const deletecommnet = async (req: Request, res: Response) => {
  const { id, user_id } = req.body as IDeleteComment;

  try {
    await deleteCommentSchema.validate(req.body, { abortEarly: false });
    const isUserExist = await findUSer(user_id); //  check userexist
    if (!isUserExist) {
      apiResponse.error(res, {
        status: ResponseCode.BAD_REQUEST,
        message: Messages.USER.USER_NOT_EXIST,
        data: {},
      });
    }
    const isCommentexist = await CommentExist(id); // cjecks commnets exist
    if (!isCommentexist) {
      res
        .status(ResponseCode.FORBIDDEN)
        .json({ Messages: Messages.COMMENT.NOT_FOUND });
    }

    const deleteComment = await destroyComment(id); // delete the comment
    res
      .status(ResponseCode.SUCCESS)
      .json({ Messages: Messages.COMMENT.COMMENT_DELETE, data: {} });
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
const updatecomment = async (req: Request, res: Response) => {
  const { user_id, id, content } = req.body as IUpdateComment;

  try {
    await updateCommentSchema.validate(req.body, { abortEarly: false });
    const isUserExist = await findUSer(user_id); //  check userexist
    if (!isUserExist) {
      apiResponse.error(res, {
        status: ResponseCode.BAD_REQUEST,
        message: Messages.USER.USER_NOT_EXIST,
        data: {},
      });
    }
    const isCommentexist = await CommentExist(id); // checks comment exist
    if (!isCommentexist) {
      apiResponse.error(res, {
        status: ResponseCode.BAD_REQUEST,
        message: Messages.COMMENT.NOT_FOUND,
        data: {},
      });
    }

    const updateData: IUpdateComment = { user_id, id, content };

    const updatedComment = await updateComment(updateData);
    res.status(ResponseCode.SUCCESS).json({
      Messages: Messages.USER.SIGNUP_SUCCESS,
      data: { updatedComment },
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
const getComment = async (req: Request, res: Response) => {
  const { id, user_id } = req.body as IGetSingleComment;

  try {
    await getCommentSchema.validate(req.body, { abortEarly: false }); // validation
    const isUserExist = await findUSer(user_id); // check user exist
    if (!isUserExist) {
      apiResponse.error(res, {
        status: ResponseCode.BAD_REQUEST,
        message: Messages.USER.USER_NOT_EXIST,
        data: {},
      });
    }
    const isCommentexist = await CommentExist(id);
    if (!isCommentexist) {
      apiResponse.error(res, {
        status: ResponseCode.BAD_REQUEST,
        message: Messages.COMMENT.NOT_FOUND,
        data: {},
      });
    }

    apiResponse.success(res, {
      status: ResponseCode.SUCCESS,
      message: Messages.COMMENT.FETCH_SUCCESS,
      data: { isCommentexist }, // show the comment
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

export { addComment, getAllcomments, deletecommnet, updatecomment, getComment };
