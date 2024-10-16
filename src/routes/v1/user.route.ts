import { Router } from 'express';
import { createUser, loginUser,  } from '../../controllers/user.controller';

export const userRouter: Router = Router();

userRouter.post('/register', createUser);
userRouter.post('/login', loginUser);

