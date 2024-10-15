import { Request, Response, NextFunction } from "express";
import { validateToken } from "../services/auth.service";

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): Response<unknown, Record<string, unknown>> | void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(400).json({ message: "Token is missing" });
  }

  const decoded: {
    isValid: boolean;
    message: string;
    data: any;
  } = validateToken(token) as {
    isValid: boolean;
    message: string;
    data: any;
  };
  if (!decoded.isValid) {
    return res.status(401).json({ message: decoded.message });
  }

  req.body.decoded = decoded.data;
  return next();
};

export default authMiddleware;