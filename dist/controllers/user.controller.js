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
exports.loginUser = exports.createUser = void 0;
const user_model_1 = require("../models/user.model");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const auth_service_1 = require("../services/auth.service");
// Create user
exports.createUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    // Check if email is already registered
    const existingUser = yield user_model_1.UserModel.findOne({ email }).lean().exec();
    if (existingUser) {
        return res.status(400).json({ message: 'User with this email is already registered' });
    }
    // Hash password
    const hashedPassword = yield (0, auth_service_1.encrypt)(password);
    const user = yield user_model_1.UserModel.create({
        name,
        email,
        password: hashedPassword,
    });
    if (!user) {
        return res.status(500).json({ message: 'Failed to create user' });
    }
    return res.status(201).json({ message: 'User created successfully', user });
}));
// User login
exports.loginUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // Find user by email
    const user = yield user_model_1.UserModel.findOne({ email }).lean().exec();
    if (!user) {
        return res.status(404).json({ message: `User with email ${email} not found` });
    }
    // Verify password
    const validPassword = yield (0, auth_service_1.decrypt)(password, user.password);
    if (!validPassword) {
        return res.status(401).json({ message: 'Invalid password' });
    }
    // Create and send JWT token
    const token = (0, auth_service_1.generateToken)({ id: user._id, userType: 'user' });
    return res.status(200).json({ message: 'Login successful', token, user });
}));
