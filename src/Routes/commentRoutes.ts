import { Router } from 'express';
import {
  addComment,
  deletecommnet,
  getAllcomments,
  getComment,
  updatecomment,
} from '../controllers/commentsController.js';

const router = Router();
router.post('/addComment', addComment);
router.get('/getAllcomments', getAllcomments);
router.patch('/deleteComment', deletecommnet);
router.patch('/updateComment', updatecomment);
router.get('/getComment', getComment);
export default router;
