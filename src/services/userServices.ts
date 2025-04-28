import Users from '../models/userModel.js';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import IUser from '../utils/interfaces/IUser.js';
const findbyEmail = async (email: string) => {
  try {
    const isUserExist = await Users.findOne({
      where: { email },
    });
    return isUserExist;
  } catch (error) {
    console.error('Error in findbyEmail:', error);
    return null;
  }
};

const newUser = async (attributes: any) => {
  const { name, email, password = null } = attributes;
  try {
    const hashPassword = await bcrypt.hash(password, 8);
    const user = await Users.create({
      name,
      email,
      password: hashPassword,
    });
    return user;
  } catch (error:any) {
    console.error('Error in newUser:', error);
  throw new Error(error);
  }
};
const userlogin = async (email: string, password: string) => {
  try {
    const isUserExist = await Users.findOne({ where: { email } });
    if (isUserExist) {
      const loginuser = await bcrypt.compare(
        password,
        isUserExist?.dataValues?.password,
      );
      return isUserExist;
    }
  } catch (error) {
    console.error('Error in findbyEmail:', error);
  }
};
export { findbyEmail, newUser, userlogin };
