"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    courses: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Course" }],
});
const UserModel = (0, mongoose_1.model)("User", userSchema);
exports.UserModel = UserModel;
