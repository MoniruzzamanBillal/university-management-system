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
exports.courseContriollers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../util/catchAsync"));
const sendResponse_1 = __importDefault(require("../../util/sendResponse"));
const course_service_1 = require("./course.service");
// ! for creating course
const createCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield course_service_1.courseServices.createCourseIntoDb(data);
    (0, sendResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: "course created successfully !!",
        data: result,
    });
}));
// ! get all course data
const getAllCourses = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield course_service_1.courseServices.getAllDataFromDb(query);
    (0, sendResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: "all course data retrived successfully !!",
        data: result,
    });
}));
// ! get single course data
const getCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield course_service_1.courseServices.getCourseDataFromDb(id);
    (0, sendResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: "course data retrived successfully !!",
        data: result,
    });
}));
// ! updating course from data
const updateCourseInfo = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    const result = yield course_service_1.courseServices.updateCourseDataIntoDb(id, data);
    (0, sendResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: "course data updated successfully !!",
        data: result,
    });
}));
// ! delete course data
const deleteCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield course_service_1.courseServices.deleteCourseFromDb(id);
    (0, sendResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: "course data deleted successfully !!",
        data: result,
    });
}));
// ! add faculty to course
const assignFacultyToCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    const { faculties } = req.body;
    const result = yield course_service_1.courseServices.assignFacultyWithCourseIntoDb(courseId, faculties);
    (0, sendResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: "Faculty added to course successfully !!",
        data: result,
    });
}));
// ! remove faculty from course
const removeFacultyToCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    const { faculties } = req.body;
    const result = yield course_service_1.courseServices.removeFacultyWithCourseIntoDb(courseId, faculties);
    (0, sendResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: "Faculty removed from course successfully !!",
        data: result,
    });
}));
//
exports.courseContriollers = {
    createCourse,
    getAllCourses,
    getCourse,
    deleteCourse,
    updateCourseInfo,
    assignFacultyToCourse,
    removeFacultyToCourse,
};
