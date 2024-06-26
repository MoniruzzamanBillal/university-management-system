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
const user_util_1 = require("./user.util");
const user_model_1 = require("./user.model");
const mongoose_1 = __importDefault(require("mongoose"));
const admin_model_1 = require("../Admin/admin.model");
const academicDepartment_model_1 = require("../academicDepartment/academicDepartment.model");
const faculty_model_1 = require("../Faculty/faculty.model");
//! function for creating a student into database
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
        userData.id = yield (0, user_util_1.generateStudentId)(semesterData);
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
        console.log(error);
        throw new AppError_1.default(http_status_1.default.NOT_ACCEPTABLE, error);
    }
    //
});
// ! create faculty  in db
const createFacultyIntoDB = (password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // create a user object
    const userData = {};
    //if password is not given , use deafult password
    userData.password = password || config_1.default.defaultPassword;
    //set faculty role
    userData.role = "faculty";
    // * find academic department info
    const academicDepartment = yield academicDepartment_model_1.academicDepartmentModel.findById(payload.academicDepartment);
    if (!academicDepartment) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Academic department not found");
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        //set  generated id
        userData.id = yield (0, user_util_1.generateFacultyId)();
        // * create a user (transaction-1)
        const newUser = yield user_model_1.userModel.create([userData], { session }); // array
        // * create a faculty
        if (!newUser.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create user");
        }
        // set id , _id as user
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; //reference _id
        const newFaculty = yield faculty_model_1.facultyModel.create([payload], { session });
        if (!newFaculty.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create faculty");
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newFaculty;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
// ! create admin in db
const createAdminIntoDB = (password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // create a user object
    const userData = {};
    //if password is not given , use deafult password
    userData.password = password || config_1.default.defaultPassword;
    //set student role
    userData.role = "admin";
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        //set  generated id
        userData.id = yield (0, user_util_1.generateAdminId)();
        // create a user (transaction-1)
        const newUser = yield user_model_1.userModel.create([userData], { session });
        //create a admin
        if (!newUser.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create admin");
        }
        // set id , _id as user
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; //reference _id
        // create a admin (transaction-2)
        const newAdmin = yield admin_model_1.adminModel.create([payload], { session });
        if (!newAdmin.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create admin");
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newAdmin;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
exports.userServices = {
    createStudentIntoDB,
    createAdminIntoDB,
    createFacultyIntoDB,
};
