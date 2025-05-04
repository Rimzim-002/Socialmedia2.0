import Users from '../models/userModel.js';
import bcrypt from 'bcrypt';
import { Ilogin, IUser, IUserUpdate } from '../utils/interfaces/IUser.js';
import Messages from '../utils/messagesManager.js';

const findbyEmail = async (email: string) => {
  try {
    const isUserExist = await Users.findOne({
      where: { email },
    });
    return isUserExist as IUser | null;
  } catch (error) {
    throw new Error(Messages.USER.EMAIL_NOT_EXISTS);
  }
};
const UserExist = async (id: string | number) => {
  try {
    const isExist = await Users.findByPk(id);
    return isExist;
  } catch (error) {
    throw new Error(Messages.USER.USER_NOT_EXIST);
  }
};
const newUser = async (attributes: IUser): Promise<IUser | null> => {
  const { name, email, password } = attributes;
  try {
    const hashPassword = await bcrypt.hash(password, 8);
    const user = await Users.create({
      name,
      email,
      password: hashPassword,
    });
    return user.get() as IUser | null;
  } catch (error: any) {
    throw new Error(error);
  }
};
const userlogin = async (attributes: Ilogin) => {
  const { email, password } = attributes;
  try {
    const isUserExist = await Users.findOne({ where: { email } });
    if (!isUserExist) {
      throw new Error(Messages.USER.USER_NOT_EXIST);
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(
      password,
      isUserExist?.dataValues?.password,
    );
    if (!isPasswordValid) {
      throw new Error(Messages.VALIDATION.INVALID_INPUT);
    }
    return isUserExist.get() as IUser;
  } catch (error) {
    throw new Error(Messages.SYSTEM.SERVER_ERROR);
  }
};

const updateUser = async (attributes: IUserUpdate) => {
  const { id, updateData } = attributes;
  try {
    const userUpdate = await Users.update(updateData, { where: { id } });

    if (userUpdate) {
      const data = await Users.findOne({ where: { id } });
      return data ? (data.toJSON() as IUserUpdate) : null;
    }
    throw new Error('User update failed');
  } catch (error) {
    throw new Error('Error occurred while updating user');
  }
};

export { findbyEmail, newUser, userlogin, UserExist, updateUser };
