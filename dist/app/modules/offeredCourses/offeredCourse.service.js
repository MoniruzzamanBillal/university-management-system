"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.offeredCourseServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../Error/AppError"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const offeredCourses_model_1 = require("./offeredCourses.model");
const semesterRegistration_model_1 = require("../semesterRegistration/semesterRegistration.model.");
const academicFaculty_model_1 = require("../academicFaculty/academicFaculty.model");
const academicDepartment_model_1 = require("../academicDepartment/academicDepartment.model");
const course_model_1 = require("../course/course.model");
const offeredCourse_util_1 = require("./offeredCourse.util");
const faculty_model_1 = require("../Faculty/faculty.model");
const semesterRegistration_constant_1 = require("../semesterRegistration/semesterRegistration.constant");
// ! create course in db
const createOfferedCourseIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { semesterRegistration, academicFaculty, academicDepartment, course, section, faculty, days, startTime, endTime, } = payload;
    // * check if registeded semester  exist
    const isSemesterRegistrationExits = yield semesterRegistration_model_1.semesterRegistrationModel.findById(semesterRegistration);
    if (!isSemesterRegistrationExits) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This semster is not registered!! ");
    }
    const academicSemester = isSemesterRegistrationExits === null || isSemesterRegistrationExits === void 0 ? void 0 : isSemesterRegistrationExits.academicSemester;
    // * check if Faculty  exist
    const isFacultyExist = yield faculty_model_1.facultyModel.findById(faculty);
    if (!isFacultyExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, " faculty not exist !! ");
    }
    // * check if academicFaculty  exist
    const isAcademicFacultyExist = yield academicFaculty_model_1.academicFacultyModel.findById(academicFaculty);
    if (!isAcademicFacultyExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Academic faculty not exist !! ");
    }
    // * check if academicDepartment  exist
    const isAcademicDepartmentExist = yield academicDepartment_model_1.academicDepartmentModel.findById(academicDepartment);
    if (!isAcademicDepartmentExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "academic Department  not exist !! ");
    }
    // * check if course  exist
    const isCourseExist = yield course_model_1.courseModel.findById(course);
    if (!isCourseExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "course is not not exist !! ");
    }
    //  * depart belong to academic faculty
    const isDepartmentBelongToFaculty = yield academicDepartment_model_1.academicDepartmentModel.findOne({
        _id: academicDepartment,
        academicFaculty,
    });
    if (!isDepartmentBelongToFaculty) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `this '${isAcademicDepartmentExist === null || isAcademicDepartmentExist === void 0 ? void 0 : isAcademicDepartmentExist.name}' is not belong to this '${isAcademicFacultyExist === null || isAcademicFacultyExist === void 0 ? void 0 : isAcademicFacultyExist.name}' `);
    }
    // * check duplicate section number
    const isDuplicateSectionExist = yield offeredCourses_model_1.offeredCourseModel.findOne({
        semesterRegistration,
        course,
        section,
    });
    if (isDuplicateSectionExist) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `section='${section}' is already exist!! `);
    }
    // * get faculty schedule
    const assignedSchedule = yield offeredCourses_model_1.offeredCourseModel
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
    const hasScheduleConglict = (0, offeredCourse_util_1.hasTimeConflict)(assignedSchedule, newSchedule);
    if (hasScheduleConglict) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This faculty is not availavle at that time !! ");
    }
    const result = yield offeredCourses_model_1.offeredCourseModel.create(Object.assign(Object.assign({}, payload), { academicSemester }));
    return result;
});
// ! get all offered course from dbb
const getAllOfferedCoursesFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const offeredCourseQuery = new QueryBuilder_1.default(offeredCourses_model_1.offeredCourseModel.find(), query)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield offeredCourseQuery.queryModel;
    return result;
});
// ! get single course from database
const getSingleOfferedCourseFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const offeredCourse = yield offeredCourses_model_1.offeredCourseModel.findById(id);
    if (!offeredCourse) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Offered Course not found");
    }
    return offeredCourse;
});
// ! update course from database
const updateOfferedCourseIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { faculty, days, startTime, endTime } = payload;
    // * check if registeded semester  exist
    const isOfferedCourseExits = yield offeredCourses_model_1.offeredCourseModel.findById(id);
    const semesterRegistration = isOfferedCourseExits === null || isOfferedCourseExits === void 0 ? void 0 : isOfferedCourseExits.semesterRegistration;
    // * check if offered course exist
    if (!isOfferedCourseExits) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Offered course not found  !! ");
    }
    // * check if regsiter semester is upcoming
    const registeredSemester = yield semesterRegistration_model_1.semesterRegistrationModel.findById(semesterRegistration);
    if (registeredSemester &&
        (registeredSemester === null || registeredSemester === void 0 ? void 0 : registeredSemester.status) !== semesterRegistration_constant_1.RegistrationStatus.UPCOMING) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, ` '${registeredSemester === null || registeredSemester === void 0 ? void 0 : registeredSemester.status}' semester can not be modified !!  `);
    }
    // * check if Faculty  exist
    const isFacultyExist = yield faculty_model_1.facultyModel.findById(faculty);
    if (!isFacultyExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, " faculty not exist !! ");
    }
    // * get faculty schedule
    const assignedSchedule = yield offeredCourses_model_1.offeredCourseModel
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
    const hasScheduleConglict = (0, offeredCourse_util_1.hasTimeConflict)(assignedSchedule, newSchedule);
    if (hasScheduleConglict) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This faculty is not availavle at that time !! ");
    }
    const result = yield offeredCourses_model_1.offeredCourseModel.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
    //
});
// ! delete course from database
const deleteOfferedCourseFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id);
    // * check if registeded semester  exist
    const isOfferedCourseExits = yield offeredCourses_model_1.offeredCourseModel.findById(id);
    //  * check if offered course is exist or not
    if (!isOfferedCourseExits) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Offered course not found  !! ");
    }
    const semesterRegistration = isOfferedCourseExits === null || isOfferedCourseExits === void 0 ? void 0 : isOfferedCourseExits.semesterRegistration;
    const registeredSemester = yield semesterRegistration_model_1.semesterRegistrationModel.findById(semesterRegistration);
    const registeredSemesterStatus = registeredSemester === null || registeredSemester === void 0 ? void 0 : registeredSemester.status;
    if (registeredSemester &&
        registeredSemesterStatus !== semesterRegistration_constant_1.RegistrationStatus.UPCOMING) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, ` '${registeredSemesterStatus}' semester can not be deleteed !!  `);
    }
    const result = yield offeredCourses_model_1.offeredCourseModel.findByIdAndDelete(id);
    return result;
});
exports.offeredCourseServices = {
    createOfferedCourseIntoDB,
    getAllOfferedCoursesFromDB,
    getSingleOfferedCourseFromDB,
    updateOfferedCourseIntoDB,
    deleteOfferedCourseFromDB,
};
