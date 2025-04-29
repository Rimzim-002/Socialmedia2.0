import { findbyEmail, newUser, userlogin } from '../services/userServices.js';
import Messages from '../utils/messagesManager.js';
import { ResponseCode } from '../utils/Enums/responseCode.js';
import APIResponse from '../utils/apiResponse.js';
import Tokenhandle from '../utils/jwtManager.js';
import yup from 'yup';
const signupUser = async (req, res) => {
    const { name, email, password } = req.body;
    const SignuSchema = yup.object({
        name: yup
            .string()
            .required('Name is required')
            .min(2, 'Name must be at least 2 characters'),
        email: yup
            .string()
            .required('Email is required')
            .email('Invalid email format'),
        password: yup
            .string()
            .min(6, 'Password must  must be at least 6 characters')
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
            .status(ResponseCode.SUCCESS)
            .json({ Messages: Messages.USER.SIGNUP_SUCCESS, data: user });
    }
    catch (error) {
        console.error('Error fetching data:', error);
        res.status(ResponseCode.SYSTEM).json({ message: Messages.SYSTEM });
    }
};
const signinUser = async (req, res) => {
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
        }
        else {
            res
                .status(ResponseCode.FORBIDDEN)
                .json({ message: Messages.USER.INVALID_CREDENTIALS });
        }
    }
    catch (error) {
        res
            .status(ResponseCode.SYSTEM)
            .json({ message: error.message || Messages.SYSTEM });
    }
};
export { signupUser, signinUser };
