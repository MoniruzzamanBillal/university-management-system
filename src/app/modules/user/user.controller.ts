import { NextFunction, Request, RequestHandler, Response } from "express";
import { userServices } from "./user.service";
import sendResponse from "../../util/sendResponse";
import httpStatus from "http-status";

const catchAsync = (func: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(func(req, res, next)).catch((error) => next(error));
  };
};

// ! function for creating a student
const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  const result = await userServices.createStudentIntoDB(password, studentData);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "New student created successfully !!",
    data: result,
  });
});

// ! function for creating a faculty
const createFaculty = catchAsync(async (req, res) => {
  const data = req.body;
});

// ! function for creating an admin
const createAdmin = catchAsync(async (req, res) => {
  const data = req.body;
});

//
export const userController = {
  createStudent,
  createFaculty,
  createAdmin,
};
