"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourse = exports.updateCourse = exports.createCourse = exports.getCourse = exports.getCourses = void 0;
const course_model_1 = require("../models/course.model");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const user_model_1 = require("../models/user.model");
exports.getCourses = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const itemsPerPage = Math.max(Number(req.query.itemsPerPage) || 10, 1); // Ensure at least 1 item per page
    const pageCount = Math.max(Number(req.query.pageCount) || 1, 1); // Ensure at least page 1
    const skip = itemsPerPage * (pageCount - 1);
    const totalCourses = yield course_model_1.CourseModel.countDocuments().exec();
    const courses = yield course_model_1.CourseModel.find()
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
}));
exports.getCourse = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const course = yield course_model_1.CourseModel.findById(id).lean().exec();
    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }
    return res.status(200).json({
        message: "Course retrieved successfully",
        data: course,
    });
}));
exports.createCourse = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, duration, instructor } = req.body;
    const userId = req.body.decoded.id;
    const course = yield course_model_1.CourseModel.create({
        name,
        description,
        duration,
        instructor,
        createdBy: userId,
    });
    yield user_model_1.UserModel.findByIdAndUpdate(userId, {
        $push: { courses: course._id },
    });
    return res.status(201).json({
        message: "Course created successfully",
        data: course,
    });
}));
exports.updateCourse = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, description, duration, instructor } = req.body;
    const course = yield course_model_1.CourseModel.findByIdAndUpdate(id, { name, description, duration, instructor }, { new: true })
        .lean()
        .exec();
    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }
    return res.status(200).json({
        message: "Course updated successfully",
        data: course,
    });
}));
exports.deleteCourse = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const course = yield course_model_1.CourseModel.findByIdAndDelete(id).lean().exec();
    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }
    yield user_model_1.UserModel.updateOne({ _id: course.createdBy }, { $pull: { courses: id } });
    return res.status(200).json({
        message: "Course deleted successfully",
        data: course,
    });
}));
