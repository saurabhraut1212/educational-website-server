import { Request, Response, NextFunction } from "express";
import { CourseModel } from "../models/course.model";
import catchAsync from "../utils/catchAsync";
import {UserModel} from "../models/user.model";


export const getCourses = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const itemsPerPage = Math.max(Number(req.query.itemsPerPage) || 10, 1); // Ensure at least 1 item per page
        const pageCount = Math.max(Number(req.query.pageCount) || 1, 1); // Ensure at least page 1
        const skip = itemsPerPage * (pageCount - 1);


        const totalCourses = await CourseModel.countDocuments().exec();


        const courses = await CourseModel.find()
            .skip(skip)
            .limit(itemsPerPage)
            .lean()
            .exec();


        if (!courses || courses.length === 0) {
            return res.status(200).json({
                message: "No courses found",
                data: {
                    courses: [],
                    currentPage: pageCount,
                    totalCourses,
                },
            });
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


export const createCourse = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { name, description, duration, instructor } = req.body;
        const userId = req.body.decoded.id;


        const course = await CourseModel.create({
            name,
            description,
            duration,
            instructor,
            createdBy: userId,
        });


        await UserModel.findByIdAndUpdate(userId, {
            $push: { courses: course._id },
        });

        return res.status(201).json({
            message: "Course created successfully",
            data: course,
        });
    }
);


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


export const deleteCourse = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;


        const course = await CourseModel.findByIdAndDelete(id).lean().exec();
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        await UserModel.updateOne(
            { _id: course.createdBy },
            { $pull: { courses: id } }
        );

        return res.status(200).json({
            message: "Course deleted successfully",
            data: course,
        });
    }
);
