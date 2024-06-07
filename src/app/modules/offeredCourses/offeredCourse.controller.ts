import httpStatus from "http-status";
import catchAsync from "../../util/catchAsync";
import sendResponse from "../../util/sendResponse";
import { offeredCourseServices } from "./offeredCourse.service";

// ! create course
const createOfferedCourse = catchAsync(async (req, res) => {
  const result = await offeredCourseServices.createOfferedCourseIntoDB(
    req.body
  );

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Offered Course is created successfully !",
    data: result,
  });
});

// ! get all course

const getAllOfferedCourses = catchAsync(async (req, res) => {
  console.log(req.body);

  const result = await offeredCourseServices.getAllOfferedCoursesFromDB(
    req.query
  );

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Offered Course is created successfully !",
    data: result,
  });
});

// ! get single offered course
const getSingleOfferedCourses = catchAsync(async (req, res) => {
  console.log(req.body);

  const { id } = req.params;

  const result = await offeredCourseServices.getSingleOfferedCourseFromDB(id);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Offered Course is created successfully !",
    data: result,
  });
});

// ! update offered course
const updateOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await offeredCourseServices.updateOfferedCourseIntoDB(id);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Offered Course is created successfully !",
    data: result,
  });
});

// ! dellete offered course
const deleteOfferedCourseFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await offeredCourseServices.deleteOfferedCourseFromDB(id);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Offered Course is created successfully !",
    data: result,
  });
});

export const offeredCourseController = {
  createOfferedCourse,
  getAllOfferedCourses,
  getSingleOfferedCourses,
  updateOfferedCourse,
  deleteOfferedCourseFromDB,
};
