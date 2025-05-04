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

//signup user
const signupUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body as IUser;
  // validations
  const SignuSchema = yup.object({
    name: yup
      .string()
      .required('Name is required')
      .min(2, 'Name must be at least 2 characters')
      .matches(/^[a-zA-Z\s]+$/, 'Name must contain only letters'),

    email: yup
      .string()
      .required('Email is required')
      .email('Invalid email format'),

    password: yup
      .string()
      .required('Password is required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d\W]).{8,}$/,
        'Password must be at least 8 characters, include uppercase, lowercase, and a number or special character',
      ),
  });

  try {
    await SignuSchema.validate(req.body, { abortEarly: false });

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
    const user = await newUser(userCreate);// creating  user
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
        message: 'Validation failed',
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
  const schema = yup.object().shape({
    email: yup
      .string()
      .email('Invalid email format')
      .required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  try {
    await schema.validate(req.body, { abortEarly: false });
    const isUserExist = await findbyEmail(email);
    // user exist 
    if (!isUserExist) {
      apiResponse.error(res, {
        status: ResponseCode.FORBIDDEN,
        message: Messages.USER.EMAIL_EXISTS,
        data: {},
      });
    }
    const userloged: Ilogin = { email, password };
    const loginUser = await userlogin(userloged);// login  user
    if (loginUser) {
      const token = Tokenhandle.generateToken({ //generating  token
        email: loginUser.email,
        username: loginUser.name,
      });
      APIResponse.success(res, {
        status: 200,
        message: 'Login successful',
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
        message: 'Validation failed',
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
        message: 'Validation failed',
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
