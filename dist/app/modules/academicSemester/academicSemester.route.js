"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicSemesterRouter = void 0;
const express_1 = require("express");
const academicSemester_validation_1 = require("./academicSemester.validation");
const validaateRequest_1 = __importDefault(require("../../middleware/validaateRequest"));
const academicSemester_controller_1 = require("./academicSemester.controller");
const router = (0, express_1.Router)();
router.post("/create-semester", (0, validaateRequest_1.default)(academicSemester_validation_1.academicSemesterZodSchemas.createAcademicSemesterSchema), academicSemester_controller_1.academicSemesterController.createSemester);
router.get("/get-semesters", academicSemester_controller_1.academicSemesterController.getSmesters);
router.get("/get-semester/:semesterId", academicSemester_controller_1.academicSemesterController.getSemester);
router.put("/update-semester/:semesterId", (0, validaateRequest_1.default)(academicSemester_validation_1.academicSemesterZodSchemas.updatedAcademicSemesterSchemaValidationSchema), academicSemester_controller_1.academicSemesterController.updateSemester);
exports.academicSemesterRouter = router;
