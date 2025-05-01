import Users from '../models/userModel.js';
import bcrypt from 'bcrypt';
const findbyEmail = async (email) => {
    try {
        const isUserExist = await Users.findOne({
            where: { email },
        });
        return isUserExist;
    }
    catch (error) {
        console.error('Error in findbyEmail:', error);
        throw error;
    }
};
const UserExist = async (id) => {
    const isExist = await Users.findByPk(id);
    return isExist;
};
const newUser = async (attributes) => {
    const { name, email, password } = attributes;
    try {
        const hashPassword = await bcrypt.hash(password, 8);
        const user = await Users.create({
            name,
            email,
            password: hashPassword,
        });
        return user;
    }
    catch (error) {
        console.error('Error in newUser:', error);
        throw new Error(error);
    }
};
const userlogin = async (attributes) => {
    const { email, password } = attributes;
    try {
        const isUserExist = await Users.findOne({ where: { email } });
        if (isUserExist) {
            const isPasswordValid = await bcrypt.compare(password, isUserExist?.dataValues?.password);
            if (isPasswordValid) {
                return isUserExist;
            }
        }
    }
    catch (error) {
        console.error('Error in findbyEmail:', error);
    }
};
const updateUser = async (attributes) => {
    const { id, updateData } = attributes;
    const userUpdate = await Users.update(updateData, { where: { id } });
    if (userUpdate) {
        const data = await Users.findOne({ where: { id } });
        return data;
    }
};
export { findbyEmail, newUser, userlogin, UserExist, updateUser };
