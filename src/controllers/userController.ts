import { Request, Response } from 'express';
import {
  findbyEmail,
  newUser,
  UserExist,
  userlogin,
  updateUser,
} from '../services/userServices.js';
import Messages from '../utils/messagesManager.js';
import { IUser, IUserUpdate, Ilogin } from '../utils/interfaces/IUser.js';

import { ResponseCode } from '../utils/Enums/responseCode.js';
import APIResponse from '../utils/apiResponse.js';
import Tokenhandle from '../utils/jwtManager.js';
import yup, { string } from 'yup';
import apiResponse from '../utils/apiResponse.js';
import {
  signinSchema,
  signupSchema,
  updateUserSchema,
} from '../utils/Validations/userValidation.js';

//signup user
const signupUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body as IUser;
  // validations

  try {
    await signupSchema.validate(req.body, { abortEarly: false });

    const isUserExist = await findbyEmail(email);
    // checks user already exist or not
    if (isUserExist) {
      apiResponse.error(res, {
        status: ResponseCode.FORBIDDEN,
        message: Messages.USER.EMAIL_EXISTS,
        data: {},
      });
    }
    const userCreate: IUser = { name, email, password };
    const user = await newUser(userCreate); // creating  user
    apiResponse.success(res, {
      status: ResponseCode.CREATED_SUCESSFULY,
      message: Messages.USER.SIGNUP_SUCCESS,
      data: { user },
    });
  } catch (error: any) {
    // Handling  the validation errors centrally
    if (error instanceof yup.ValidationError) {
      const simplifiedErrors = error.inner.map((err: any) => ({
        field: err.path,
        message: err.message,
      }));

      APIResponse.error(res, {
        status: 400,
        message: Messages.VALIDATION.INVALID_INPUT,
        data: simplifiedErrors,
      });
    }
    // Handling the  validation errors on server

    APIResponse.error(res, {
      status: ResponseCode.SYSTEM,
      message: Messages.SYSTEM.SERVER_ERROR,
      data: { error: error.message },
    });
  }
};
// signin user
const signinUser = async (req: Request, res: Response) => {
  const { email, password } = req.body as Ilogin;
  // validations

  try {
    await signinSchema.validate(req.body, { abortEarly: false });
    const isUserExist = await findbyEmail(email);
    // user exist
    if (!isUserExist) {
      apiResponse.error(res, {
        status: ResponseCode.FORBIDDEN,
        message: Messages.VALIDATION.INVALID_INPUT,
        data: {},
      });
    }
    const userloged: Ilogin = { email, password };
    const loginUser = await userlogin(userloged); // login  user
    if (loginUser) {
      const token = Tokenhandle.generateToken({
        //generating  token
        email: loginUser.email,
        username: loginUser.name,
      });
      APIResponse.success(res, {
        status: 200,
        message: Messages.USER.LOGIN_SUCCESS,
        data: { loginUser, token },
      });
    }
  } catch (error: any) {
    // Handling  the validation errors centrally
    if (error instanceof yup.ValidationError) {
      const simplifiedErrors = error.inner.map((err: any) => ({
        field: err.path,
        message: err.message,
      }));

      APIResponse.error(res, {
        status: 400,
        message: Messages.VALIDATION.INVALID_INPUT,
        data: simplifiedErrors,
      });
    }
    // Handling the  validation errors on server

    APIResponse.error(res, {
      status: ResponseCode.SYSTEM,
      message: Messages.SYSTEM.SERVER_ERROR,
      data: { error: error.message },
    });
  }
};
// upadte user
const updatedUser = async (req: Request, res: Response) => {
  const { id, updateData } = req.body as IUserUpdate;

  try {
    await updateUserSchema.validate(req.body, { abortEarly: false });
    const isUserExist = await UserExist(id);
    if (!isUserExist) {
      apiResponse.error(res, {
        status: ResponseCode.BAD_REQUEST,
        message: Messages.USER.USER_NOT_EXIST,
        data: {},
      });
    }

    // Check if user is trying to update email  which is already  exist
    if (updateData.email) {
      const existingUser = await findbyEmail(updateData.email);
      if (existingUser && existingUser.id !== id) {
        apiResponse.error(res, {
          status: ResponseCode.FORBIDDEN,
          message: Messages.USER.EMAIL_EXISTS,
          data: {},
        });
      }
    }

    const updatedUser = await updateUser({ id, updateData });

    apiResponse.success(res, {
      status: ResponseCode.SUCCESS,
      message: Messages.USER.USER_UPDATED,
      data: { user: updatedUser },
    });
  } catch (error: any) {
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

    apiResponse.error(res, {
      status: ResponseCode.SYSTEM,
      message: Messages.SYSTEM.SERVER_ERROR,
      data: { error: error.message },
    });
  }
};

export { signupUser, signinUser, updatedUser };
