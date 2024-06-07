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
const mongoose_1 = __importDefault(require("mongoose"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const course_constant_1 = require("./course.constant");
const course_model_1 = require("./course.model");
const AppError_1 = __importDefault(require("../../Error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
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
    const result = yield course_model_1.courseModel
        .findById(id)
        .populate("preRequisiteCourses.course");
    return result;
});
// ! update course data
const updateCourseDataIntoDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const { preRequisiteCourses } = payload, remainingData = __rest(payload, ["preRequisiteCourses"]);
        const modifiedData = Object.assign({}, remainingData);
        // console.log(preRequisiteCourses);
        // ! check any prerequuisit course
        if (preRequisiteCourses && preRequisiteCourses.length) {
            //*    deleting prerequisite process
            const deletePrerequisits = preRequisiteCourses
                .filter((element) => element.course && element.isDeleted)
                .map((ele) => ele.course);
            const deleteCourse = yield course_model_1.courseModel.findByIdAndUpdate(id, {
                $pull: {
                    preRequisiteCourses: {
                        course: { $in: deletePrerequisits },
                    },
                },
            }, { new: true, runValidators: true, session });
            if (!deleteCourse) {
                throw new AppError_1.default(http_status_1.default.NOT_MODIFIED, "Failed to delete pre requisite courses !! ");
            }
            //*    adding  prerequisite process
            const addPrerequisits = preRequisiteCourses.filter((element) => element.course && !element.isDeleted);
            const addCourses = yield course_model_1.courseModel.findByIdAndUpdate(id, {
                $addToSet: {
                    preRequisiteCourses: { $each: addPrerequisits },
                },
            }, { new: true, runValidators: true, session });
            if (!addCourses) {
                throw new AppError_1.default(http_status_1.default.NOT_MODIFIED, "Failed to Add pre requisite courses !! ");
            }
        }
        //* genereal field update
        const generalUpdate = yield course_model_1.courseModel.findByIdAndUpdate(id, modifiedData, {
            new: true,
            runValidators: true,
            session,
        });
        if (!generalUpdate) {
            throw new AppError_1.default(http_status_1.default.NOT_MODIFIED, "Failed to update general course data  !! ");
        }
        const result = yield course_model_1.courseModel
            .findById(id)
            .populate("preRequisiteCourses.course");
        yield session.commitTransaction();
        yield session.endSession();
        return result;
    }
    catch (error) {
        console.log(error);
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error("unsuccessfull updation of course !!");
    }
});
// ! delete course data
const deleteCourseFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.courseModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
});
// ! assigning faculty into course
const assignFacultyWithCourseIntoDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.courseFacultyModel.findByIdAndUpdate(id, {
        course: id,
        $addToSet: { faculties: { $each: payload } },
    }, { upsert: true, new: true });
    return result;
});
// ! remove faculty from course
const removeFacultyWithCourseIntoDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = course_model_1.courseFacultyModel.findByIdAndUpdate(id, {
        $pull: { faculties: { $in: payload } },
    }, { new: true, runValidators: true });
    return result;
});
//
exports.courseServices = {
    createCourseIntoDb,
    getAllDataFromDb,
    getCourseDataFromDb,
    updateCourseDataIntoDb,
    deleteCourseFromDb,
    assignFacultyWithCourseIntoDb,
    removeFacultyWithCourseIntoDb,
};
