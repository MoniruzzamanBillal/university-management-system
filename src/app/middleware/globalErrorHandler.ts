import { NextFunction, Request, Response } from "express";

const globalErrorHandler = async (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error.status || 500;
  return res.status(status).json({
    success: false,
    message: error.message || "Something went wrong!!",
    error,
  });
};

export default globalErrorHandler;
