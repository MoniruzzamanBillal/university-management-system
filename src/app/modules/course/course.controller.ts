import httpStatus from "http-status";
import catchAsync from "../../util/catchAsync";
import sendResponse from "../../util/sendResponse";
import { courseServices } from "./course.service";

// ! for creating course
const createCourse = catchAsync(async (req, res) => {
  const data = req.body;

  const result = await courseServices.createCourseIntoDb(data);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "course created successfully !!",
    data: result,
  });
});

// ! get all course data
const getAllCourses = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await courseServices.getAllDataFromDb(query);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "all course data retrived successfully !!",
    data: result,
  });
});

// ! get single course data
const getCourse = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await courseServices.getCourseDataFromDb(id);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "course data retrived successfully !!",
    data: result,
  });
});

// ! updating course from data
const updateCourseInfo = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const result = await courseServices.updateCourseDataIntoDb(id, data);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "course data updated successfully !!",
    data: result,
  });
});

// ! delete course data
const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await courseServices.deleteCourseFromDb(id);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "course data deleted successfully !!",
    data: result,
  });
});

// ! add faculty to course
const assignFacultyToCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;

  const result = await courseServices.assignFacultyWithCourseIntoDb(
    courseId,
    faculties
  );

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Faculty added to course successfully !!",
    data: result,
  });
});

// ! remove faculty from course
const removeFacultyToCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;

  const result = await courseServices.removeFacultyWithCourseIntoDb(
    courseId,
    faculties
  );

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Faculty removed from course successfully !!",
    data: result,
  });
});

//
export const courseContriollers = {
  createCourse,
  getAllCourses,
  getCourse,
  deleteCourse,
  updateCourseInfo,
  assignFacultyToCourse,
  removeFacultyToCourse,
};
