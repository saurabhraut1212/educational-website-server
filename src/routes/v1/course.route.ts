import { Router } from 'express';
import { createCourse, deleteCourse, getCourse, getCourses, updateCourse } from '../../controllers/course.controller';

export const courseRouter: Router = Router();

courseRouter.get('/', getCourses);
courseRouter.get('/:id', getCourse);
courseRouter.post('/', createCourse);
courseRouter.patch('/:id', updateCourse);
courseRouter.delete('/:id', deleteCourse);
