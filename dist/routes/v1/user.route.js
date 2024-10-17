"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("../../controllers/user.controller");
const auth_middleware_1 = __importDefault(require("../../middleware/auth.middleware"));
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post("/signup", user_controller_1.createUser);
exports.userRouter.post("/login", user_controller_1.loginUser);
// userRouter.get("/:id", authMiddleware(), getUser);
// userRouter.get("/", authMiddleware(), getALLUsers);
exports.userRouter.patch("/:userId", (0, auth_middleware_1.default)(), user_controller_1.updateUser);
// userRouter.patch("/:userId/manage-courses", authMiddleware(), manageCourseEnrollment);
// userRouter.delete("/:id", authMiddleware(), deleteUser);
