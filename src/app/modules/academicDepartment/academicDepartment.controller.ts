import httpStatus from "http-status";
import catchAsync from "../../util/catchAsync";
import sendResponse from "../../util/sendResponse";
import { academicDepartmentService } from "./academicDepartment.service";

// ! for creating academic department
const createAcademicDepartment = catchAsync(async (req, res) => {
  const data = req.body;

  const result =
    await academicDepartmentService.createAcademicDepartmentIntoDB(data);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Created academic department  !! ",
    data: result,
  });
});

// ! get all academic department data
const getAllAcademicDepartment = catchAsync(async (req, res) => {
  const result = await academicDepartmentService.getAllAcademicDepartment();

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Retrived academic department data !! ",
    data: result,
  });
});

// ! get specific academic department data
const getSpecificAcademicDepartment = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await academicDepartmentService.getAcademicDepartment(id);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Retrived academic department data !! ",
    data: result,
  });
});

// ! update  specific academic department data
const updateSpecificAcademicDepartment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const result = await academicDepartmentService.updateAcademicDepartment(
    id,
    data
  );

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Updated academic department  !! ",
    data: result,
  });
});

//
export const academicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSpecificAcademicDepartment,
  updateSpecificAcademicDepartment,
};
