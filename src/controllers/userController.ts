import { Request, Response } from 'express';
import {
  findbyEmail,
  newUser,
  UserExist,
  userlogin,
  updateUser,
} from '../services/userServices.js';
import Messages from '../utils/messagesManager.js';
import IUser from '../utils/interfaces/IUser.js';
import { ResponseCode } from '../utils/Enums/responseCode.js';
import APIResponse from '../utils/apiResponse.js';
import Tokenhandle from '../utils/jwtManager.js';
import yup, { string } from 'yup';
import { regex } from '../utils/regex.js';
import apiResponse from '../utils/apiResponse.js';
const signupUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const SignuSchema = yup.object({
    name: yup
      .string()
      .required('Name is required')
      .matches(regex.NAME_REG, 'invalid name format '),
    email: yup
      .string()
      .required('Email is required')
      .matches(regex.EMAIL_REG, 'invalid emailformat  '),
    password: yup
      .string()
      .matches(
        regex.PASSWORD_REG,
        'passsword has eight characters including one uppercase letter, one lowercase letter, and one number or special character',
      )
      .required(`Password is required`),
  });
  try {
    await SignuSchema.validate(req.body, { abortEarly: false });

    const isUserExist = await findbyEmail(email);
    if (isUserExist) {
      res
        .status(ResponseCode.FORBIDDEN)
        .json({ Messages: Messages.USER.EMAIL_EXISTS });
    }
    const userCreate = { name, email, password };
    const user = await newUser(userCreate);
    res
      .status(ResponseCode.CREATED_SUCESSFULY)
      .json({ Messages: Messages.USER.SIGNUP_SUCCESS, data: user });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(ResponseCode.SYSTEM).json({ message: Messages.SYSTEM });
  }
};

const signinUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

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
    if (!isUserExist) {
      res
        .status(ResponseCode.NOT_FOUND)
        .json({ message: Messages.USER.USER_NOT_EXIST });
    }
    const userloged = { email, password };
    const loginUser = await userlogin(userloged);
    if (loginUser) {
      const token = Tokenhandle.generateToken(loginUser.dataValues);
      APIResponse.success(res, {
        status: 200,
        message: 'Login successful',
        data: { loginUser, token },
      });
    } else {
      res
        .status(ResponseCode.FORBIDDEN)
        .json({ message: Messages.USER.INVALID_CREDENTIALS });
    }
  } catch (error: any) {
    res
      .status(ResponseCode.SYSTEM)
      .json({ message: error.message || Messages.SYSTEM });
  }
};

const updatedUser = async (req: Request, res: Response) => {
  const { id, ...updateData } = req.body;

  try {
    const isUserExist = await UserExist(id);
    console.log('User existence check:', isUserExist);

    if (!isUserExist) {
      apiResponse.error(res, {
        status: ResponseCode.BAD_REQUEST,
        message: Messages.USER.USER_NOT_EXIST,
        data: {},
      });
    }

    const updatedUser = await updateUser({ id, updateData });

    console.log('User updated:', updatedUser);

    apiResponse.success(res, {
      status: ResponseCode.SUCCESS,
      message: Messages.USER.USER_UPDATED,
      data: { user: updatedUser },
    });
  } catch (error) {
    console.error('Error updating user:', error);
    apiResponse.error(res, {
      status: ResponseCode.SYSTEM,
      message: Messages.SYSTEM.SERVER_ERROR,
      data: {},
    });
  }
};

export { signupUser, signinUser, updatedUser };
