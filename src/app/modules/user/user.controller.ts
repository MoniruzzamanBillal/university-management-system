import { userServices } from "./user.service";
import sendResponse from "../../util/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../util/catchAsync";
import { userModel } from "./user.model";

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

// ! for getting all users
const getAllUser = catchAsync(async (req, res) => {
  const result = await userModel.find();
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "retrived all users ",
    data: result,
  });
});

//
export const userController = {
  createStudent,
  createFaculty,
  createAdmin,
  getAllUser,
};
