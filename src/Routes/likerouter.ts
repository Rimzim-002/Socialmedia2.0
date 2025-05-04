import { Router } from "express";
import {addLike,fetchLikes} from "../controllers/likeController.js";
const router = Router();
  router.post('/addalike',addLike)
  router.get('/getLikes',fetchLikes)
  export default router