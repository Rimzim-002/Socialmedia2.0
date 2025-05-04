import { findbyEmail, newUser, UserExist, userlogin, updateUser, } from '../services/userServices.js';
import Messages from '../utils/messagesManager.js';
import { ResponseCode } from '../utils/Enums/responseCode.js';
import APIResponse from '../utils/apiResponse.js';
import Tokenhandle from '../utils/jwtManager.js';
import yup from 'yup';
import apiResponse from '../utils/apiResponse.js';
import { signinSchema, signupSchema, updateUserSchema } from '../utils/Validations/userValidation.js';
//signup user
const signupUser = async (req, res) => {
    const { name, email, password } = req.body;
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
        const userCreate = { name, email, password };
        const user = await newUser(userCreate); // creating  user
        apiResponse.success(res, {
            status: ResponseCode.CREATED_SUCESSFULY,
            message: Messages.USER.SIGNUP_SUCCESS,
            data: { user },
        });
    }
    catch (error) {
        // Handling  the validation errors centrally
        if (error instanceof yup.ValidationError) {
            const simplifiedErrors = error.inner.map((err) => ({
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
const signinUser = async (req, res) => {
    const { email, password } = req.body;
    // validations
    try {
        await signinSchema.validate(req.body, { abortEarly: false });
        const isUserExist = await findbyEmail(email);
        // user exist 
        if (!isUserExist) {
            apiResponse.error(res, {
                status: ResponseCode.FORBIDDEN,
                message: Messages.USER.EMAIL_EXISTS,
                data: {},
            });
        }
        const userloged = { email, password };
        const loginUser = await userlogin(userloged); // login  user
        if (loginUser) {
            const token = Tokenhandle.generateToken({
                email: loginUser.email,
                username: loginUser.name,
            });
            APIResponse.success(res, {
                status: 200,
                message: 'Login successful',
                data: { loginUser, token },
            });
        }
    }
    catch (error) {
        // Handling  the validation errors centrally
        if (error instanceof yup.ValidationError) {
            const simplifiedErrors = error.inner.map((err) => ({
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
const updatedUser = async (req, res) => {
    const { id, updateData } = req.body;
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
    }
    catch (error) {
        if (error instanceof yup.ValidationError) {
            const simplifiedErrors = error.inner.map((err) => ({
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
