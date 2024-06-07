import httpStatus from "http-status";
import catchAsync from "../../util/catchAsync";
import sendResponse from "../../util/sendResponse";
import { semesterRegistrationServices } from "./semesterRegistration.service";

// ! create semester registration
const createSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await semesterRegistrationServices.createSemesterRegistrationIntoDB(
      req.body
    );

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Semester registratered successfully !! ",
    data: result,
  });
});

// ! get all semester registration data
const getAllSemesterRegistrations = catchAsync(async (req, res) => {
  const result =
    await semesterRegistrationServices.getAllSemesterRegistrationsFromDB(
      req.query
    );

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Retrived all registration semester successfully !!",
    data: result,
  });
});

// ! get particular  semester registration data
const getSingleSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result =
    await semesterRegistrationServices.getSingleSemesterRegistrationsFromDB(id);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Retrived registration semester successfully !!",
    data: result,
  });
});

// ! update  particular  semester registration data
const updateSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await semesterRegistrationServices.updateSemesterRegistrationIntoDB(
      id,
      req.body
    );

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Updated registration semester successfully !!",
    data: result,
  });
});

// ! delete   particular  semester registration data
const deleteSemesterRegistration = catchAsync(async (req, res) => {
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Delete registration semester successfully !!",
    data: "result",
  });
});

//
export const semesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistrations,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
  deleteSemesterRegistration,
};
