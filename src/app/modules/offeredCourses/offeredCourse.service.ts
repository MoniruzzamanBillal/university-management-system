import httpStatus from "http-status";
import AppError from "../../Error/AppError";
import QueryBuilder from "../../builder/QueryBuilder";
import { offeredCourseModel } from "./offeredCourses.model";
import { TOfferedCourse } from "./offeredCourses.interface";
import { semesterRegistrationModel } from "../semesterRegistration/semesterRegistration.model.";
import { academicFacultyModel } from "../academicFaculty/academicFaculty.model";
import { academicDepartmentModel } from "../academicDepartment/academicDepartment.model";
import { courseModel } from "../course/course.model";
import { hasTimeConflict } from "./offeredCourse.util";
import { facultyModel } from "../Faculty/faculty.model";
import { RegistrationStatus } from "../semesterRegistration/semesterRegistration.constant";

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

  // * check if Faculty  exist
  const isFacultyExist = await facultyModel.findById(faculty);
  if (!isFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, " faculty not exist !! ");
  }

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

  //  * depart belong to academic faculty
  const isDepartmentBelongToFaculty = await academicDepartmentModel.findOne({
    _id: academicDepartment,
    academicFaculty,
  });

  if (!isDepartmentBelongToFaculty) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `this '${isAcademicDepartmentExist?.name}' is not belong to this '${isAcademicFacultyExist?.name}' `
    );
  }

  // * check duplicate section number
  const isDuplicateSectionExist = await offeredCourseModel.findOne({
    semesterRegistration,
    course,
    section,
  });

  if (isDuplicateSectionExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `section='${section}' is already exist!! `
    );
  }

  // * get faculty schedule
  const assignedSchedule = await offeredCourseModel
    .find({
      semesterRegistration,
      faculty,
      days: {
        $in: days,
      },
    })
    .select("days startTime endTime");

  // * new schedule
  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  //  * check schedule conflict
  const hasScheduleConglict = hasTimeConflict(assignedSchedule, newSchedule);

  if (hasScheduleConglict) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This faculty is not availavle at that time !! "
    );
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
const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Pick<
    TOfferedCourse,
    "faculty" | "days" | "startTime" | "endTime" | "maxCapacity"
  >
) => {
  const { faculty, days, startTime, endTime } = payload;

  // * check if registeded semester  exist
  const isOfferedCourseExits = await offeredCourseModel.findById(id);

  const semesterRegistration = isOfferedCourseExits?.semesterRegistration;

  // * check if offered course exist
  if (!isOfferedCourseExits) {
    throw new AppError(httpStatus.NOT_FOUND, "Offered course not found  !! ");
  }

  // * check if regsiter semester is upcoming
  const registeredSemester =
    await semesterRegistrationModel.findById(semesterRegistration);

  if (
    registeredSemester &&
    registeredSemester?.status !== RegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      ` '${registeredSemester?.status}' semester can not be modified !!  `
    );
  }

  // * check if Faculty  exist
  const isFacultyExist = await facultyModel.findById(faculty);
  if (!isFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, " faculty not exist !! ");
  }

  // * get faculty schedule
  const assignedSchedule = await offeredCourseModel
    .find({
      semesterRegistration,
      faculty,
      days: {
        $in: days,
      },
    })
    .select("days startTime endTime");

  // * new schedule
  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  //  * check schedule conflict
  const hasScheduleConglict = hasTimeConflict(assignedSchedule, newSchedule);

  if (hasScheduleConglict) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This faculty is not availavle at that time !! "
    );
  }

  const result = await offeredCourseModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;

  //
};

// ! delete course from database
const deleteOfferedCourseFromDB = async (id: string) => {
  console.log(id);
  // * check if registeded semester  exist
  const isOfferedCourseExits = await offeredCourseModel.findById(id);

  //  * check if offered course is exist or not
  if (!isOfferedCourseExits) {
    throw new AppError(httpStatus.NOT_FOUND, "Offered course not found  !! ");
  }

  const semesterRegistration = isOfferedCourseExits?.semesterRegistration;

  const registeredSemester =
    await semesterRegistrationModel.findById(semesterRegistration);

  const registeredSemesterStatus = registeredSemester?.status;

  if (
    registeredSemester &&
    registeredSemesterStatus !== RegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      ` '${registeredSemesterStatus}' semester can not be deleteed !!  `
    );
  }

  const result = await offeredCourseModel.findByIdAndDelete(id);
  return result;
};

export const offeredCourseServices = {
  createOfferedCourseIntoDB,
  getAllOfferedCoursesFromDB,
  getSingleOfferedCourseFromDB,
  updateOfferedCourseIntoDB,
  deleteOfferedCourseFromDB,
};
