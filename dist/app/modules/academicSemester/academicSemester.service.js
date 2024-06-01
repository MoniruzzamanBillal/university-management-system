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
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicSemesterServices = void 0;
const semesterNameCodeMaper_1 = require("../../util/semesterNameCodeMaper");
const academicSemester_model_1 = require("./academicSemester.model");
// ! creating semester in database
const createSemesterintoDb = (paload) => __awaiter(void 0, void 0, void 0, function* () {
    if (semesterNameCodeMaper_1.semesterNameCodeMaper[paload.name] !== paload.code) {
        throw new Error("Invalid semester!!");
    }
    const isSemesterExist = yield academicSemester_model_1.academicSemesterModel.findOne({
        name: paload.name,
    });
    if (isSemesterExist) {
        throw new Error("Semester already exist !! ");
    }
    const res = yield academicSemester_model_1.academicSemesterModel.create(paload);
    return res;
});
// ! getting all semester from db
const getAllSemester = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_model_1.academicSemesterModel.find();
    return result;
});
//! getting particular semester data from db
const getSingleSemester = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_model_1.academicSemesterModel.findById({ _id: id });
    return result;
});
// ! updating semester data
const updateSemesterIntoDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.name &&
        payload.code &&
        semesterNameCodeMaper_1.semesterNameCodeMaper[payload.name] !== payload.code) {
        throw new Error("Invalid semester code !! ");
    }
    const result = yield academicSemester_model_1.academicSemesterModel.findOneAndUpdate({ _id: id }, payload, { new: true });
    return result;
});
//
exports.academicSemesterServices = {
    createSemesterintoDb,
    getAllSemester,
    getSingleSemester,
    updateSemesterIntoDb,
};
