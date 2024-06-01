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
exports.academicDepartmentService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../Error/AppError"));
const academicDepartment_model_1 = require("./academicDepartment.model");
// ! create academic department into DB
const createAcademicDepartmentIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isDeptExist = yield academicDepartment_model_1.academicDepartmentModel.findOne({
        name: payload.name,
    });
    if (isDeptExist) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Department already exist!!");
    }
    const result = yield academicDepartment_model_1.academicDepartmentModel.create(payload);
    return result;
});
// ! get all academic data from DB
const getAllAcademicDepartment = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartment_model_1.academicDepartmentModel
        .find()
        .populate("academicFaculty");
    return result;
});
// ! get specific academic data from DB
const getAcademicDepartment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartment_model_1.academicDepartmentModel
        .findOne({ _id: id })
        .populate("academicFaculty");
    return result;
});
// ! update  specific academic data from DB
const updateAcademicDepartment = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartment_model_1.academicDepartmentModel.findOneAndUpdate({ _id: id }, payload, { new: true });
    return result;
});
exports.academicDepartmentService = {
    createAcademicDepartmentIntoDB,
    getAllAcademicDepartment,
    getAcademicDepartment,
    updateAcademicDepartment,
};