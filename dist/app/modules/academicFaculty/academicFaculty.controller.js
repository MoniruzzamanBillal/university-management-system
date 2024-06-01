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
exports.academicFacultyController = void 0;
const catchAsync_1 = __importDefault(require("../../util/catchAsync"));
const academicFaculty_service_1 = require("./academicFaculty.service");
const sendResponse_1 = __importDefault(require("../../util/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
// ! create academic faculty
const createAcademicFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield academicFaculty_service_1.academicFacultyServices.createFacultyIntoDb(data);
    (0, sendResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: "Created academic faculty !! ",
        data: result,
    });
}));
// ! for getting all faculty
const getAllFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_service_1.academicFacultyServices.getAllAcademicFacultyFromDb();
    (0, sendResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: "Retrived all academic faculty !! ",
        data: result,
    });
}));
// ! get single faculty
const getFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield academicFaculty_service_1.academicFacultyServices.getSingleAcademicFaculty(id);
    (0, sendResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: "Retrived  academic faculty !! ",
        data: result,
    });
}));
// ! update academic faculty
const updateFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    const result = academicFaculty_service_1.academicFacultyServices.updateAcademicFacultyFromDb(id, data);
    (0, sendResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: "Updated academic faculty !! ",
        data: result,
    });
}));
//
exports.academicFacultyController = {
    getAllFaculty,
    getFaculty,
    createAcademicFaculty,
    updateFaculty,
};
