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
exports.academicSemesterController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../util/catchAsync"));
const sendResponse_1 = __importDefault(require("../../util/sendResponse"));
const academicSemester_service_1 = require("./academicSemester.service");
// ! for creating a semester
const createSemester = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_service_1.academicSemesterServices.createSemesterintoDb(req.body);
    (0, sendResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: "New semester created successfully !!",
        data: result,
    });
}));
// ! for getting all semester data
const getSmesters = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_service_1.academicSemesterServices.getAllSemester();
    (0, sendResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: "Retrived all semester data successfullyy !! ",
        data: result,
    });
}));
// ! for getting single Semester
const getSemester = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { semesterId } = req.params;
    const result = yield academicSemester_service_1.academicSemesterServices.getSingleSemester(semesterId);
    (0, sendResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: "semester data retrived successfully ",
        data: result,
    });
}));
// ! updating semester
const updateSemester = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { semesterId } = req.params;
    const data = req.body;
    const result = yield academicSemester_service_1.academicSemesterServices.updateSemesterIntoDb(semesterId, data);
    (0, sendResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: "academic semester updated  successfully ",
        data: result,
    });
}));
//
exports.academicSemesterController = {
    createSemester,
    getSmesters,
    getSemester,
    updateSemester,
};
