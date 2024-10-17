import { Router } from "express";
import {
  createUser,
  loginUser,
  updateUser,
} from "../../controllers/user.controller";
import authMiddleware from "../../middleware/auth.middleware";

export const userRouter: Router = Router();

userRouter.post("/signup", createUser);
userRouter.post("/login", loginUser);
// userRouter.get("/:id", authMiddleware(), getUser);
// userRouter.get("/", authMiddleware(), getALLUsers);
userRouter.patch("/:userId", authMiddleware(), updateUser);
// userRouter.patch("/:userId/manage-courses", authMiddleware(), manageCourseEnrollment);
// userRouter.delete("/:id", authMiddleware(), deleteUser);
