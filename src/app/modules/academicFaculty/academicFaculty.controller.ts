import catchAsync from "../../util/catchAsync";
import { academicFacultyServices } from "./academicFaculty.service";
import sendResponse from "../../util/sendResponse";
import httpStatus from "http-status";

// ! create academic faculty
const createAcademicFaculty = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await academicFacultyServices.createFacultyIntoDb(data);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Created academic faculty !! ",
    data: result,
  });
});

// ! for getting all faculty
const getAllFaculty = catchAsync(async (req, res) => {
  const result = await academicFacultyServices.getAllAcademicFacultyFromDb();

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Retrived all academic faculty !! ",
    data: result,
  });
});

// ! get single faculty
const getFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await academicFacultyServices.getSingleAcademicFaculty(id);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Retrived  academic faculty !! ",
    data: result,
  });
});

// ! update academic faculty
const updateFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const result = academicFacultyServices.updateAcademicFacultyFromDb(id, data);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Updated academic faculty !! ",
    data: result,
  });
});

//

export const academicFacultyController = {
  getAllFaculty,
  getFaculty,
  createAcademicFaculty,
  updateFaculty,
};
