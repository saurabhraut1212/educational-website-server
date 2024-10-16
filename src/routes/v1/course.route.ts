import { Router } from "express";
import {
  createCourse,
  deleteCourse,
  getCourse,
  getCourses,
  updateCourse,
} from "../../controllers/course.controller";
import authMiddleware from "../../middleware/auth.middleware";

export const courseRouter: Router = Router();

courseRouter.get("/", authMiddleware(), getCourses);
courseRouter.get("/:id", authMiddleware(), getCourse);
courseRouter.post("/", authMiddleware(), createCourse);
courseRouter.patch("/:id", authMiddleware(), updateCourse);
courseRouter.delete("/:id", authMiddleware(), deleteCourse);
