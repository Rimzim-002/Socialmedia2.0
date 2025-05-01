import yup from 'yup';
import { postAvail } from "../services/postServices.js";
import createComment from "../services/commentServices.js";
import apiResponse from "../utils/apiResponse.js";
import { ResponseCode } from "../utils/Enums/responseCode.js";
import Messages from "../utils/messagesManager.js";
const addComment = async (req, res) => {
    const { post_id, user_id, content } = req.body;
    const commentSchema = yup.object({
        post_id: yup
            .string()
            .required('post_id is required'),
        user_id: yup
            .string()
            .required('user_id is required'),
        content: yup
            .string()
            .min(1, 'minimun one character is needed')
            .required(`comment is required`),
    });
    try {
        await commentSchema.validate(req.body, { abortEarly: false });
        const isPostExist = await postAvail(post_id);
        if (isPostExist) {
            apiResponse.error(res, { status: ResponseCode.BAD_REQUEST, message: Messages.POST.POST_NOT_FOUND, data: {} });
        }
        const postdata = { post_id, user_id, content };
        const newComment = await createComment(postdata);
        apiResponse.success(res, { status: ResponseCode.SUCCESS, message: Messages.USER.CREATED_SUCESSFULLY, data: { newComment } });
    }
    catch (error) {
        apiResponse.error(res, {
            status: ResponseCode.SYSTEM,
            message: Messages.POST.POST_NOT_FOUND,
            data: { error },
        });
    }
};
export default addComment;
