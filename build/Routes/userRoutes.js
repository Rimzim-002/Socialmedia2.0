import { Router } from 'express';
const router = Router();
import { signupUser, signinUser, updatedUser, } from '../controllers/userController.js';
router.post('/signupUser', signupUser);
router.post('/loginUser', signinUser);
router.patch('/userUpdate', updatedUser);
export default router;
