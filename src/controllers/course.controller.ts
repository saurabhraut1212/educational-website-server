import { Request, Response } from 'express';
import Course, { ICourse } from '../models/course.model';

export const getCourses = async (req: Request, res: Response): Promise<Response> => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const courses = await Course.find()
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));
    return res.json(courses);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error('An unknown error occurred');
    }
    return res.status(500).send('Server error');
  }
};

export const getCourse = async (req: Request, res: Response): Promise<Response> => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }
    return res.json(course);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error('An unknown error occurred');
    }
    return res.status(500).send('Server error');
  }
};

export const createCourse = async (req: Request, res: Response): Promise<Response> => {
  const { name, description } = req.body;
  try {
    const newCourse = new Course({ name, description });
    const course = await newCourse.save();
    return res.json(course);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error('An unknown error occurred');
    }
    return res.status(500).send('Server error');
  }
};

export const updateCourse = async (req: Request, res: Response): Promise<Response> => {
  const { name, description } = req.body;
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }
    course.name = name || course.name;
    course.description = description || course.description;
    await course.save();
    return res.json(course);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error('An unknown error occurred');
    }
    return res.status(500).send('Server error');
  }
};

export const deleteCourse = async (req: Request, res: Response): Promise<Response> => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }
    await course.remove();
    return res.json({ msg: 'Course removed' });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error('An unknown error occurred');
    }
    return res.status(500).send('Server error');
  }
};