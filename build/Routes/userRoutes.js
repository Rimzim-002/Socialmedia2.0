import { Router } from 'express';
const router = Router();
import { signupUser, signinUser } from '../controllers/userController.js';
router.post('/signupUser', signupUser);
router.post('/loginUser', signinUser);
export default router;
