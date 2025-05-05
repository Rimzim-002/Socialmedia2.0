import { Router } from 'express';
import userRoutes from './userRoutes.js';
import postRoutes from './postRoutes.js';
import commentRoutes from './commentRoutes.js';
import likeRoutes from './likerouter.js';
import { APIPaths } from '../Constants/apipath.js';

const router = Router();

router.use(APIPaths.USER, userRoutes);
router.use(APIPaths.POST, postRoutes);
router.use(APIPaths.COMMENTS, commentRoutes);
router.use(APIPaths.LIKES, likeRoutes);
export default router;
