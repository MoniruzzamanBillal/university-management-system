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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const course_constant_1 = require("./course.constant");
const course_model_1 = require("./course.model");
//! create course in DB
const createCourseIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.courseModel.create(payload);
    return result;
});
// ! get all course data  from database
const getAllDataFromDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new QueryBuilder_1.default(course_model_1.courseModel.find(), query)
        .search(course_constant_1.courseSearchableField)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield courseQuery.queryModel.populate("preRequisiteCourses.course");
    return result;
});
// ! get single course data
const getCourseDataFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.courseModel.findById(id);
    return result;
});
// ! update course data
const updateCourseDataIntoDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const remainingData = __rest(payload, []);
    const modifiedData = Object.assign({}, remainingData);
    const result = yield course_model_1.courseModel.findByIdAndUpdate(id, modifiedData, {
        new: true,
        runValidators: true,
    });
    return result;
});
// ! delete course data
const deleteCourseFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.courseModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
});
//
exports.courseServices = {
    createCourseIntoDb,
    getAllDataFromDb,
    getCourseDataFromDb,
    updateCourseDataIntoDb,
    deleteCourseFromDb,
};
