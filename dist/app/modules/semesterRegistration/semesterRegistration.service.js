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
exports.semesterRegistrationServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../Error/AppError"));
const semesterRegistration_model_1 = require("./semesterRegistration.model.");
const academicSemester_model_1 = require("../academicSemester/academicSemester.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const semesterRegistration_constant_1 = require("./semesterRegistration.constant");
const offeredCourses_model_1 = require("../offeredCourses/offeredCourses.model");
const mongoose_1 = __importDefault(require("mongoose"));
// ! create  new semester registration into db
const createSemesterRegistrationIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const academicSemester = payload === null || payload === void 0 ? void 0 : payload.academicSemester;
    const isSemesterRegistrationExist = yield semesterRegistration_model_1.semesterRegistrationModel.findOne({
        academicSemester,
    });
    //  * check if there is any 'upcoming' or 'ingoing' semester
    const isThereUpcomingOrOngoingSemester = yield semesterRegistration_model_1.semesterRegistrationModel.findOne({
        $or: [
            { status: semesterRegistration_constant_1.RegistrationStatus.UPCOMING },
            { status: semesterRegistration_constant_1.RegistrationStatus.ONGOING },
        ],
    });
    if (isThereUpcomingOrOngoingSemester) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `There is already ${isThereUpcomingOrOngoingSemester === null || isThereUpcomingOrOngoingSemester === void 0 ? void 0 : isThereUpcomingOrOngoingSemester.status} registered semester !! `);
    }
    // * check academic semester exist
    const isAcademicSemesterExist = yield academicSemester_model_1.academicSemesterModel.findById(academicSemester);
    if (!isAcademicSemesterExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This academic semester not found !! ");
    }
    // * check this  semester is already registeded
    if (isSemesterRegistrationExist) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, "This semester is already registered !! ");
    }
    const result = yield semesterRegistration_model_1.semesterRegistrationModel.create(payload);
    return result;
    //
});
// ! get all semester registration data into db
const getAllSemesterRegistrationsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const semesterRegistrationQuery = new QueryBuilder_1.default(semesterRegistration_model_1.semesterRegistrationModel.find(), query)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield semesterRegistrationQuery.queryModel.populate("academicSemester");
    return result;
});
// ! get particular semester registration data into db
const getSingleSemesterRegistrationsFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield semesterRegistration_model_1.semesterRegistrationModel
        .findById(id)
        .populate("academicSemester");
    return result;
});
// ! update  particular semester registration data into db
const updateSemesterRegistrationIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // * check academic semester exist
    const isSemesterRegistrationExist = yield semesterRegistration_model_1.semesterRegistrationModel.findById(id);
    const requestedStatus = payload === null || payload === void 0 ? void 0 : payload.status;
    if (!isSemesterRegistrationExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This  semester is not registered !! ");
    }
    // * check if requested data is ended or not
    const currentSemesterStatus = isSemesterRegistrationExist === null || isSemesterRegistrationExist === void 0 ? void 0 : isSemesterRegistrationExist.status;
    if (currentSemesterStatus === semesterRegistration_constant_1.RegistrationStatus.ENDED) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `this semester is already ${currentSemesterStatus} `);
    }
    if (currentSemesterStatus === semesterRegistration_constant_1.RegistrationStatus.UPCOMING &&
        requestedStatus === semesterRegistration_constant_1.RegistrationStatus.ENDED) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `You can't directly change status from  ${currentSemesterStatus} to ${requestedStatus}  `);
    }
    if (currentSemesterStatus === semesterRegistration_constant_1.RegistrationStatus.ONGOING &&
        requestedStatus === semesterRegistration_constant_1.RegistrationStatus.UPCOMING) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `You can't directly change status from  ${currentSemesterStatus} to ${requestedStatus}  `);
    }
    // upcoming --> ongoing --> ended
    const result = yield semesterRegistration_model_1.semesterRegistrationModel.findByIdAndUpdate(id, payload, { new: true });
    return result;
    //
});
// ! delete  particular semester registration data into db
const deleteSemesterRegistrationFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const registederSemester = yield semesterRegistration_model_1.semesterRegistrationModel.findById(id);
        console.log(registederSemester);
        // * check if semester is registered
        if (!registederSemester) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This semester is not found !! ");
        }
        const offeredCourses = yield offeredCourses_model_1.offeredCourseModel.find({
            semesterRegistration: id,
        });
        //  * check for offered course
        if (!offeredCourses.length) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "There is no offered course for this registered semester  !! ");
        }
        //  * delete offerd course  tracsaction -1
        const deleteOfferedCourse = yield offeredCourses_model_1.offeredCourseModel.deleteMany({
            semesterRegistration: id,
        }, session);
        if (!deleteOfferedCourse) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Failed to delete  offered course  !! ");
        }
        //  * delete semester registrtation   tracsaction -2
        const deleteRegisteredSemester = yield semesterRegistration_model_1.semesterRegistrationModel.findByIdAndDelete(id, session);
        if (!deleteRegisteredSemester) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Failed to delete registered course  !! ");
        }
        console.log(offeredCourses);
        yield session.commitTransaction();
        yield session.endSession();
        return deleteRegisteredSemester;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        console.log(error);
        throw new Error(error);
    }
});
//
exports.semesterRegistrationServices = {
    createSemesterRegistrationIntoDB,
    getAllSemesterRegistrationsFromDB,
    getSingleSemesterRegistrationsFromDB,
    updateSemesterRegistrationIntoDB,
    deleteSemesterRegistrationFromDB,
};
