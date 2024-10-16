import { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/user.model";
import catchAsync from "../utils/catchAsync";
import { decrypt, encrypt, generateToken } from "../services/auth.service";

// Create user
export const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    // Check if email is already registered
    const existingUser = await UserModel.findOne({ email }).lean().exec();
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email is already registered" });
    }

    // Hash password
    const hashedPassword = await encrypt(password);
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    if (!user) {
      return res.status(500).json({ message: "Failed to create user" });
    }

    return res.status(201).json({ message: "User created successfully", user });
  }
);

// User login
export const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    // Find user by email
    const user = await UserModel.findOne({ email }).lean().exec();
    if (!user) {
      return res
        .status(404)
        .json({ message: `User with email ${email} not found` });
    }

    // Verify password
    const validPassword = await decrypt(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Create and send JWT token
    const token = generateToken({ id: user._id, userType: "user" });
    return res.status(200).json({ message: "Login successful", token, user });
  }
);

// //get all users
// export const getALLUsers = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const itemsPerPage = Number(req.query.itemsPerPage) || 10;
//     const pageCount = Number(req.query.pageCount) || 1;
//     const skip = itemsPerPage * (pageCount - 1);
//     const totalUsers = await UserModel.countDocuments().exec();
//     const users = await UserModel.find()
//       .skip(skip)
//       .limit(itemsPerPage)
//       .lean()
//       .exec();

//     if (!!users && users.length === 0) {
//       return res.status(404).json({ message: "No users found" });
//     }

//     return res.status(200).json({
//       message: "Users retrieved successfully",
//       data: {
//         users,
//         currentPage: pageCount,
//         totalUsers,
//       },
//     });
//   }
// );

// // Get a single user
// export const getUser = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const { id } = req.params;
//     const user = await UserModel.findById(id).lean().exec();
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     return res.status(200).json({
//       message: "User retrieved successfully",
//       data: user,
//     });
//   }
// );
// Update user
export const updateUser = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  const updatedUser = await UserModel.findByIdAndUpdate(userId, req.body, {
    new: true,
    lean: true,
  }).exec();
  if (!updatedUser) {
    throw next(new Error(`User with Id: ${userId} not found`));
  }
  return res
    .status(200)
    .json({ message: "User updated successfully", user: updatedUser });
});

// Manage course enrollment
export const manageCourseEnrollment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const { courseId } = req.body;

    const user = await UserModel.findById(userId).exec();
    if (!user) {
      return next(new Error(`User with Id: ${userId} not found`));
    }

    const courseIndex = user.courses.indexOf(courseId);
    let update;
    if (courseIndex === -1) {
      update = { $push: { courses: courseId } };
    } else {
      update = { $pull: { courses: courseId } };
    }

    const updatedUser = await UserModel.findByIdAndUpdate(userId, update, {
      new: true,
    }).exec();

    return res
      .status(200)
      .json({ message: "Course updated successfully", user: updatedUser });
  }
);

// Delete user
// export const deleteUser = catchAsync(async (req, res, next) => {
//   const { userId } = req.params;

//   const deletedUser = await UserModel.findByIdAndDelete(userId).exec();
//   if (!deletedUser) {
//     throw next(new Error(`User with Id: ${userId} not found`));
//   }
//   return res
//     .status(200)
//     .json({ message: "User deleted successfully", user: deletedUser });
// }
// );