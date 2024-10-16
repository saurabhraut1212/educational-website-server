import { Request, Response, NextFunction } from "express";
import { CourseModel } from "../models/course.model";
import catchAsync from "../utils/catchAsync";

// Get all courses
export const getCourses = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const itemsPerPage = Number(req.query.itemsPerPage) || 10;
    const pageCount = Number(req.query.pageCount) || 1;
    const skip = itemsPerPage * (pageCount - 1);
    const totalCourses = await CourseModel.countDocuments().exec();
    const courses = await CourseModel.find()
      .skip(skip)
      .limit(itemsPerPage)
      .lean()
      .exec();

    if (!!courses && courses.length === 0) {
      return res.status(404).json({ message: "No courses found" });
    }

    return res.status(200).json({
      message: "Courses retrieved successfully",
      data: {
        courses,
        currentPage: pageCount,
        totalCourses,
      },
    });
  }
);

// Get a single course by ID
export const getCourse = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const course = await CourseModel.findById(id).lean().exec();
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    return res.status(200).json({
      message: "Course retrieved successfully",
      data: course,
    });
  }
);

// Create a new course
export const createCourse = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, description, duration, instructor } = req.body;
    const course = await CourseModel.create({
      name,
      description,
      duration,
      instructor,
    });
    return res.status(201).json({
      message: "Course created successfully",
      data: course,
    });
  }
);

// Update a course by ID
export const updateCourse = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name, description, duration, instructor } = req.body;
    const course = await CourseModel.findByIdAndUpdate(
      id,
      { name, description, duration, instructor },
      { new: true }
    )
      .lean()
      .exec();
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    return res.status(200).json({
      message: "Course updated successfully",
      data: course,
    });
  }
);

// Delete a course by ID
export const deleteCourse = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const course = await CourseModel.findByIdAndDelete(id).lean().exec();
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    return res.status(200).json({
      message: "Course deleted successfully",
      data: course,
    });
  }
);
