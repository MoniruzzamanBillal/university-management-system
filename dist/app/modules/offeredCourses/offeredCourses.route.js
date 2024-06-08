"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.offeredCourseRoutes = void 0;
const express_1 = require("express");
const offeredCourse_controller_1 = require("./offeredCourse.controller");
const offeredCourse_validation_1 = require("./offeredCourse.validation");
const validaateRequest_1 = __importDefault(require("../../middleware/validaateRequest"));
const router = (0, express_1.Router)();
router.get("/", offeredCourse_controller_1.offeredCourseController.getAllOfferedCourses);
router.get("/:id", offeredCourse_controller_1.offeredCourseController.getSingleOfferedCourses);
router.post("/create-offered-course", (0, validaateRequest_1.default)(offeredCourse_validation_1.OfferedCourseValidations.createOfferedCourseValidationSchema), offeredCourse_controller_1.offeredCourseController.createOfferedCourse);
router.patch("/:id", (0, validaateRequest_1.default)(offeredCourse_validation_1.OfferedCourseValidations.updateOfferedCourseValidationSchema), offeredCourse_controller_1.offeredCourseController.updateOfferedCourse);
router.delete("/:id", offeredCourse_controller_1.offeredCourseController.deleteOfferedCourseFromDB);
exports.offeredCourseRoutes = router;
