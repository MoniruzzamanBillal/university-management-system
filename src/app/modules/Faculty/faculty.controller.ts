import httpStatus from "http-status";
import catchAsync from "../../util/catchAsync";
import { FacultyServices } from "./faculty.service";
import sendResponse from "../../util/sendResponse";
//  ! get single  faculty
const getSingleFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacultyServices.getSingleFacultyFromDB(id);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Faculty is retrieved succesfully",
    data: result,
  });
});

//  ! get all faculty

const getAllFaculties = catchAsync(async (req, res) => {
  const result = await FacultyServices.getAllFacultiesFromDB(req.query);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Faculties are retrieved succesfully",
    data: result,
  });
});

const updateFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { faculty } = req.body;
  const result = await FacultyServices.updateFacultyIntoDB(id, faculty);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Faculty is updated succesfully",
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacultyServices.deleteFacultyFromDB(id);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Faculty is deleted succesfully",
    data: result,
  });
});

export const FacultyControllers = {
  getAllFaculties,
  getSingleFaculty,
  deleteFaculty,
  updateFaculty,
};
