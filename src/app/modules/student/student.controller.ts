import httpStatus from "http-status";
import { StudentServices } from "./sttudent.service";
import sendResponse from "../../util/sendResponse";
import catchAsync from "../../util/catchAsync";

// ! for getting single student data
const getSingleStudent = catchAsync(async (req, res) => {
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
const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB(req.query);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Students are retrieved succesfully",
    data: result,
  });
});

//! function for delete a student data
const deleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteStudentFromDB(studentId);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Student is deleted succesfully",
    data: result,
  });
});

// ! function for update a student
const updateStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const { student } = req.body;

  const result = await StudentServices.updateStudentFromDb(studentId, student);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Student is updated succesfully",
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
