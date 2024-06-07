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
// ! create  new semester registration into db
const createSemesterRegistrationIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const academicSemester = payload === null || payload === void 0 ? void 0 : payload.academicSemester;
    const isSemesterRegistrationExist = yield semesterRegistration_model_1.semesterRegistrationModel.findOne({
        academicSemester,
    });
    //  * check if there is any 'upcoming' or 'ingoing' semester
    const isThereUpcomingOrOngoingSemester = yield semesterRegistration_model_1.semesterRegistrationModel.findOne({
        $or: [{ status: "UPCOMING" }, { status: "ONGOING" }],
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
    if (!isSemesterRegistrationExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This  semester is not registered !! ");
    }
    // * check if requested data is ended or not
    const requestedSemester = isSemesterRegistrationExist === null || isSemesterRegistrationExist === void 0 ? void 0 : isSemesterRegistrationExist.status;
    if (requestedSemester === "ENDED") {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `this semester is already ${requestedSemester} `);
    }
    //
});
// ! delete  particular semester registration data into db
const deleteSemesterRegistrationFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("checking !!! ");
});
//
exports.semesterRegistrationServices = {
    createSemesterRegistrationIntoDB,
    getAllSemesterRegistrationsFromDB,
    getSingleSemesterRegistrationsFromDB,
    updateSemesterRegistrationIntoDB,
    deleteSemesterRegistrationFromDB,
};
