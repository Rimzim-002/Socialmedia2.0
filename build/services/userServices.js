import Users from '../models/userModel.js';
import bcrypt from 'bcrypt';
const findbyEmail = async (email) => {
    try {
        const isUserExist = await Users.findOne({
            where: { email }
        });
        return isUserExist;
    }
    catch (error) {
        console.error('Error in findbyEmail:', error);
        return null;
    }
};
const newUser = async (name, email, password) => {
    try {
        const hashPassword = await bcrypt.hash(password, 8);
        const user = await Users.create({
            name,
            email,
            password: hashPassword
        });
        return user;
    }
    catch (error) {
        console.error('Error in newUser:', error);
        return null;
    }
};
const userlogin = async (email, password) => {
    try {
        const isUserExist = await Users.findOne({ where: { email } });
        if (isUserExist) {
            const loginuser = await bcrypt.compare(password, isUserExist?.dataValues?.password);
            return isUserExist;
        }
    }
    catch (error) {
        console.error('Error in findbyEmail:', error);
    }
};
export { findbyEmail, newUser, userlogin };
