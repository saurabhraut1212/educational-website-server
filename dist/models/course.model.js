"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseModel = void 0;
const mongoose_1 = require("mongoose");
const courseSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number },
    instructor: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
const CourseModel = (0, mongoose_1.model)('Course', courseSchema);
exports.CourseModel = CourseModel;
