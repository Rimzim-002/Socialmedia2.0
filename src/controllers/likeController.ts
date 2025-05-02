
import { Request,Response } from "express"
import { findUSer } from "../services/postServices";
import apiResponse from "../utils/apiResponse";
import { ResponseCode } from "../utils/Enums/responseCode";
import Messages from "../utils/messagesManager";
const addLike= async(req:Request,res:Response)=>{
    try{
   const{id,user_id,type,status}=req.body
   const isUserExist = await findUSer(user_id);
    if (!isUserExist) {
      apiResponse.error(res, {
        status: ResponseCode.BAD_REQUEST,
        message: Messages.USER.USER_NOT_EXIST,
        data: {},
      });
    }

    }catch(error){

    }
}
 export  default addLike