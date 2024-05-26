import httpStatus from "http-status";
import { StudentServices } from "./sttudent.service";
import sendResponse from "../../util/sendResponse";
import catchAsync from "../../util/catchAsync";

// ! for getting single student data
const getSingleStudent = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(studentId);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Student is retrieved succesfully",
    data: result,
  });
});

// ! function for getting all student data
const getAllStudents = catchAsync(async (req, res, next) => {
  const result = await StudentServices.getAllStudentsFromDB();

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Students are retrieved succesfully",
    data: result,
  });
});

//! function for delete a student data
const deleteStudent = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteStudentFromDB(studentId);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Student is deleted succesfully",
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
