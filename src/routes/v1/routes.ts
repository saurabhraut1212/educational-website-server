
import { Router } from 'express';
import { userRouter } from './user.route';
import { contactRouter } from './contact.route';
import { courseRouter } from './course.route';

const router = Router();

router.use('/user', userRouter);
router.use('/contact', contactRouter);
router.use('/course', courseRouter);

export default router;