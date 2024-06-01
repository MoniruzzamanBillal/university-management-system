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
exports.userServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../Error/AppError"));
const config_1 = __importDefault(require("../../config"));
const academicSemester_model_1 = require("../academicSemester/academicSemester.model");
const student_model_1 = require("../student/student.model");
const student_util_1 = require("./student.util");
const user_model_1 = require("./user.model");
const mongoose_1 = __importDefault(require("mongoose"));
//! function for creating a student inot database
const createStudentIntoDB = (password, studentData) => __awaiter(void 0, void 0, void 0, function* () {
    const semesterData = yield academicSemester_model_1.academicSemesterModel.findById({
        _id: studentData.admissionSemester,
    });
    if (!semesterData) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "invalid semester !!!");
    }
    const userData = {};
    userData.password = password || config_1.default.defaultPassword;
    userData.role = "student";
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        userData.id = yield (0, student_util_1.generateStudentId)(semesterData);
        //* create a user // transaction 1
        const newUser = yield user_model_1.userModel.create([userData], { session });
        //* create a student
        if (!newUser.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User not created !! ");
        }
        studentData.id = newUser[0].id;
        studentData.user = newUser[0]._id;
        //* create a student // transaction 2
        const newStudent = yield student_model_1.StudentModel.create([studentData], { session });
        if (!newStudent.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Student not created !! ");
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newStudent;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
    }
    //
});
exports.userServices = {
    createStudentIntoDB,
};
