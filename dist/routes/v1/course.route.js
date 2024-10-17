"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseRouter = void 0;
const express_1 = require("express");
const course_controller_1 = require("../../controllers/course.controller");
const auth_middleware_1 = __importDefault(require("../../middleware/auth.middleware"));
exports.courseRouter = (0, express_1.Router)();
exports.courseRouter.get("/", (0, auth_middleware_1.default)(), course_controller_1.getCourses);
exports.courseRouter.get("/:id", (0, auth_middleware_1.default)(), course_controller_1.getCourse);
exports.courseRouter.post("/", (0, auth_middleware_1.default)(), course_controller_1.createCourse);
exports.courseRouter.put("/:id", (0, auth_middleware_1.default)(), course_controller_1.updateCourse);
exports.courseRouter.delete("/:id", (0, auth_middleware_1.default)(), course_controller_1.deleteCourse);
