import { error } from "console";
import Comments from "../models/commentsModel.js";
const createComment = async (attributes) => {
    const { post_id, user_id, content } = attributes;
    const newCommnet = await Comments.create({
        post_id,
        user_id,
        content
    });
    console.log("7654323456890", newCommnet);
    if (newCommnet) {
        return newCommnet;
    }
    throw error;
};
export default createComment;
