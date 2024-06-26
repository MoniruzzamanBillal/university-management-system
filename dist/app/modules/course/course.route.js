"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseRouter = void 0;
const express_1 = require("express");
const validaateRequest_1 = __importDefault(require("../../middleware/validaateRequest"));
const course_controller_1 = require("./course.controller");
const course_validation_1 = require("./course.validation");
const router = (0, express_1.Router)();
router.post("/create-course", (0, validaateRequest_1.default)(course_validation_1.courseValidations.createCourseValidationSchema), course_controller_1.courseContriollers.createCourse);
router.get("/allCourses", course_controller_1.courseContriollers.getAllCourses);
router.get("/:id", course_controller_1.courseContriollers.getCourse);
router.patch("/:id", (0, validaateRequest_1.default)(course_validation_1.courseValidations.updateCourseValidationSchema), course_controller_1.courseContriollers.updateCourseInfo);
router.put("/:courseId/assign-faculty", (0, validaateRequest_1.default)(course_validation_1.courseValidations.FacultyValidationSchema), course_controller_1.courseContriollers.assignFacultyToCourse);
router.delete("/:courseId/remove-faculty", (0, validaateRequest_1.default)(course_validation_1.courseValidations.FacultyValidationSchema), course_controller_1.courseContriollers.removeFacultyToCourse);
router.delete("/:id", course_controller_1.courseContriollers.deleteCourse);
exports.courseRouter = router;
