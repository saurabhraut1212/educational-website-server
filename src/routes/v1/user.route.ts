import { Router } from 'express';
import { login, logout, signup } from '../controllers/userController';

export const userRouter: Router = Router();

userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.post('/logout', logout);

