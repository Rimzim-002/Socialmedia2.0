import { Router } from 'express';
import addComment from '../controllers/commentsController.js';
const router = Router();
router.post('/addComment', addComment);
export default router;
