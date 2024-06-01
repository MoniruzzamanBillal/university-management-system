"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicFacultyRouter = void 0;
const express_1 = require("express");
const academicFaculty_controller_1 = require("./academicFaculty.controller");
const validaateRequest_1 = __importDefault(require("../../middleware/validaateRequest"));
const academicFaculty_validation_1 = require("./academicFaculty.validation");
const router = (0, express_1.Router)();
router.post("/create-faculty", (0, validaateRequest_1.default)(academicFaculty_validation_1.academicFacultyValidation.createAcademicFacultyValidationSchema), academicFaculty_controller_1.academicFacultyController.createAcademicFaculty);
router.get("/get-faculty", academicFaculty_controller_1.academicFacultyController.getAllFaculty);
router.get("/get-faculty/:id", academicFaculty_controller_1.academicFacultyController.getFaculty);
router.put("/update-faculty/:id", (0, validaateRequest_1.default)(academicFaculty_validation_1.academicFacultyValidation.updateAcademicFacultyValidationSchema), academicFaculty_controller_1.academicFacultyController.updateFaculty);
exports.academicFacultyRouter = router;
