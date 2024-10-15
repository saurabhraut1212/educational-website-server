import { Router } from 'express';
import { getCourses, getCourse, createCourse, updateCourse, deleteCourse } from '../controllers/courseController';

export const courseRouter: Router = Router();

courseRouter.get('/', getCourses);
courseRouter.get('/:id', getCourse);
courseRouter.post('/', createCourse);
courseRouter.put('/:id', updateCourse);
courseRouter.delete('/:id', deleteCourse);
