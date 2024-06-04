"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicDepartmentRouter = void 0;
const express_1 = require("express");
const academicDepartment_controller_1 = require("./academicDepartment.controller");
const router = (0, express_1.Router)();
router.post("/create-department", 
// validateRequest(
//   AcademicDepartmentValidation.createAcademicDepartmentValidationSchema
// ),
academicDepartment_controller_1.academicDepartmentController.createAcademicDepartment);
router.get("/all-department", academicDepartment_controller_1.academicDepartmentController.getAllAcademicDepartment);
router.get("/department/:id", academicDepartment_controller_1.academicDepartmentController.getSpecificAcademicDepartment);
router.put("/department/:id", academicDepartment_controller_1.academicDepartmentController.updateSpecificAcademicDepartment);
exports.academicDepartmentRouter = router;
