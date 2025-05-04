import { Router } from "express";
import addLike from "../controllers/likeController.js";
const router = Router();
router.post('/addalike', addLike);
export default router;
