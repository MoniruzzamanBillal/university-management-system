import { userServices } from "./user.service";
import sendResponse from "../../util/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../util/catchAsync";
import { userModel } from "./user.model";

// ! function for creating a student
const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  const result = await userServices.createStudentIntoDB(
    password,
    studentData,
    req.file
  );

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "New student created successfully !!",
    data: result,
  });
});

// ! function for creating a faculty
const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await userServices.createFacultyIntoDB(password, facultyData);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Faculty is created succesfully",
    data: result,
  });
});

// ! function for creating an admin
const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await userServices.createAdminIntoDB(password, adminData);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Admin is created succesfully",
    data: result,
  });
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
