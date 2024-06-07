import httpStatus from "http-status";
import AppError from "../../Error/AppError";
import QueryBuilder from "../../builder/QueryBuilder";
import { offeredCourseModel } from "./offeredCourses..model";
import { TOfferedCourse } from "./offeredCourses.interface";
import { semesterRegistrationModel } from "../semesterRegistration/semesterRegistration.model.";
import { academicFacultyModel } from "../academicFaculty/academicFaculty.model";
import { academicDepartmentModel } from "../academicDepartment/academicDepartment.model";
import { courseModel } from "../course/course.model";

// ! create course in db
const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    section,
    faculty,
    days,
    startTime,
    endTime,
  } = payload;

  // * check if registeded semester  exist
  const isSemesterRegistrationExits =
    await semesterRegistrationModel.findById(semesterRegistration);

  if (!isSemesterRegistrationExits) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This semster is not registered!! "
    );
  }

  const academicSemester = isSemesterRegistrationExits?.academicSemester;

  // * check if academicFaculty  exist
  const isAcademicFacultyExist =
    await academicFacultyModel.findById(academicFaculty);
  if (!isAcademicFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic faculty not exist !! ");
  }

  // * check if academicDepartment  exist
  const isAcademicDepartmentExist =
    await academicDepartmentModel.findById(academicDepartment);
  if (!isAcademicDepartmentExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "academic Department  not exist !! "
    );
  }

  // * check if course  exist
  const isCourseExist = await courseModel.findById(course);
  if (!isCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, "course is not not exist !! ");
  }

  const result = await offeredCourseModel.create({
    ...payload,
    academicSemester,
  });

  return result;
};

// ! get all offered course from dbb
const getAllOfferedCoursesFromDB = async (query: Record<string, unknown>) => {
  const offeredCourseQuery = new QueryBuilder(offeredCourseModel.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await offeredCourseQuery.queryModel;
  return result;
};

// ! get single course from database
const getSingleOfferedCourseFromDB = async (id: string) => {
  const offeredCourse = await offeredCourseModel.findById(id);

  if (!offeredCourse) {
    throw new AppError(httpStatus.NOT_FOUND, "Offered Course not found");
  }

  return offeredCourse;
};

// ! update course from database
const updateOfferedCourseIntoDB = async (id: string) => {
  console.log(id);
};

// ! delete course from database
const deleteOfferedCourseFromDB = async (id: string) => {
  console.log(id);
};

export const offeredCourseServices = {
  createOfferedCourseIntoDB,
  getAllOfferedCoursesFromDB,
  getSingleOfferedCourseFromDB,
  updateOfferedCourseIntoDB,
  deleteOfferedCourseFromDB,
};
