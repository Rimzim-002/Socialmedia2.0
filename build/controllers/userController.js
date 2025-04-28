import { findbyEmail, newUser, userlogin } from '../services/userServices.js';
import Messages from "../utils/messagesManager.js";
const signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(200).json({ message: Messages.VALIDATION.REQUIRED_FIELDS });
        }
        const isUserExist = await findbyEmail(email);
        if (isUserExist) {
            res.status(500).json({ Messages: Messages.USER.EMAIL_EXISTS });
        }
        const user = await newUser(name, email, password);
        res.status(200).json({ Messages: Messages.USER.SIGNUP_SUCCESS, data: user });
    }
    catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: Messages.SYSTEM });
    }
};
const signinUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(200).json({ message: Messages.VALIDATION.REQUIRED_FIELDS });
        }
        const isUserExist = await findbyEmail(email);
        if (!isUserExist) {
            res.status(200).json({ message: Messages.USER.USER_NOT_EXIST });
        }
        const loginUser = await userlogin(email, password);
        if (loginUser) {
            res.status(200).json({ message: Messages.USER.LOGIN_SUCCESS, data: loginUser });
        }
    }
    catch (error) {
        res.status(500).json({ message: Messages.SYSTEM });
    }
};
export { signupUser, signinUser };
