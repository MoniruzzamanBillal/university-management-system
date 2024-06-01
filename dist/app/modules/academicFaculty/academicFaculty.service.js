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
exports.academicFacultyServices = void 0;
const academicFaculty_model_1 = require("./academicFaculty.model");
// ! creating academic faculty into DB
const createFacultyIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_model_1.academicFacultyModel.create(payload);
    return result;
});
// ! get all data from DB
const getAllAcademicFacultyFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_model_1.academicFacultyModel.find();
    return result;
});
// ! get particular academic faculty
const getSingleAcademicFaculty = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_model_1.academicFacultyModel.findOne({ _id: id });
    return result;
});
// ! update academic faculty
const updateAcademicFacultyFromDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_model_1.academicFacultyModel.findOneAndUpdate({ _id: id }, payload, { new: true });
    return result;
});
exports.academicFacultyServices = {
    createFacultyIntoDb,
    getAllAcademicFacultyFromDb,
    getSingleAcademicFaculty,
    updateAcademicFacultyFromDb,
};
