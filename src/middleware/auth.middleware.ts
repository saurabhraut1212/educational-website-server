import { Request, Response, NextFunction } from "express";
import { validateToken } from "../services/auth.service";

const authMiddleware = () => (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new Error("Token missing")
    }

    const decoded: {
      isValid: boolean;
      message: string;
      data: any
    } = validateToken(token) as {
      isValid: boolean;
      message: string;
      data: any;
    };

    if (!decoded.isValid) {
      throw new Error(decoded.message);
    }

    req.body.decoded = decoded.data;
    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;