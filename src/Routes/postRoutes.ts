import { Router } from 'express';
import {
  addPost,
  deletePost,
  upatePost,
} from '../controllers/postController.js';
import { allPosts, userPost } from '../controllers/postController.js';
const router = Router();
router.post('/addPost', addPost);
router.patch('/updatePost', upatePost);
router.patch('/deletePost', deletePost);
router.get('/userPosts', allPosts);
router.get('/userPost', userPost);
export default router;
