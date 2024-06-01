"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicDepartmentRouter = void 0;
const express_1 = require("express");
const validaateRequest_1 = __importDefault(require("../../middleware/validaateRequest"));
const academicDepartment_validation_1 = require("./academicDepartment.validation");
const academicDepartment_controller_1 = require("./academicDepartment.controller");
const router = (0, express_1.Router)();
router.post("/create-department", (0, validaateRequest_1.default)(academicDepartment_validation_1.AcademicDepartmentValidation.createAcademicDepartmentValidationSchema), academicDepartment_controller_1.academicDepartmentController.createAcademicDepartment);
router.get("/all-department", academicDepartment_controller_1.academicDepartmentController.getAllAcademicDepartment);
router.get("/department/:id", academicDepartment_controller_1.academicDepartmentController.getSpecificAcademicDepartment);
router.put("/department/:id", academicDepartment_controller_1.academicDepartmentController.updateSpecificAcademicDepartment);
exports.academicDepartmentRouter = router;
