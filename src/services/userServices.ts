import Users from '../models/userModel.js';
import bcrypt from 'bcrypt';

const findbyEmail = async (email: string) => {
  try {
    const isUserExist = await Users.findOne({
      where: { email },
    });
    return isUserExist;
  } catch (error) {
    console.error('Error in findbyEmail:', error);
    throw error;
  }
};

const newUser = async (attributes: any) => {
  const { name, email, password } = attributes;
  try {
    const hashPassword = await bcrypt.hash(password, 8);
    const user = await Users.create({
      name,
      email,
      password: hashPassword,
    });
    return user;
  } catch (error: any) {
    console.error('Error in newUser:', error);
    throw new Error(error);
  }
};
const userlogin = async (attributes: any) => {
  const { email, password } = attributes;
  try {
    const isUserExist = await Users.findOne({ where: { email } });
    if (isUserExist) {
      const isPasswordValid = await bcrypt.compare(
        password,
        isUserExist?.dataValues?.password,
      );
      if (isPasswordValid) {
        return isUserExist;
      }
    }
  } catch (error) {
    console.error('Error in findbyEmail:', error);
  }
};
export { findbyEmail, newUser, userlogin };
