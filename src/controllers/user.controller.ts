import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models/user.model';
import catchAsync from '../utils/catchAsync';
import { decrypt, encrypt, generateToken } from '../services/auth.service';

// Create user
export const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  // Check if email is already registered
  const existingUser = await UserModel.findOne({ email }).lean().exec();
  if (existingUser) {
    return res.status(400).json({ message: 'User with this email is already registered' });
  }

  // Hash password
  const hashedPassword = await encrypt(password);
  const user = await UserModel.create({
    name,
    email,
    password: hashedPassword,
  });

  if (!user) {
    return res.status(500).json({ message: 'Failed to create user' });
  }

  return res.status(201).json({ message: 'User created successfully', user });
});

// User login
export const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await UserModel.findOne({ email }).lean().exec();
  if (!user) {
    return res.status(404).json({ message: `User with email ${email} not found` });
  }

  // Verify password
  const validPassword = await decrypt(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  // Create and send JWT token
  const token = generateToken({ id: user._id, userType: 'user' });
  return res.status(200).json({ message: 'Login successful', token, user });
});