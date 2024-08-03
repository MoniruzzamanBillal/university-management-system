"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacultyRouter = void 0;
const express_1 = require("express");
const faculty_controller_1 = require("./faculty.controller");
const validaateRequest_1 = __importDefault(require("../../middleware/validaateRequest"));
const faculty_validation_1 = require("./faculty.validation");
const authValidation_1 = __importDefault(require("../../middleware/authValidation"));
const user_constant_1 = require("../user/user.constant");
const router = (0, express_1.Router)();
router.get("/:id", faculty_controller_1.FacultyControllers.getSingleFaculty);
router.patch("/:id", (0, validaateRequest_1.default)(faculty_validation_1.updateFacultyValidationSchema), faculty_controller_1.FacultyControllers.updateFaculty);
router.delete("/:id", faculty_controller_1.FacultyControllers.deleteFaculty);
router.get("/", (0, authValidation_1.default)(user_constant_1.UserRole.admin, user_constant_1.UserRole.faculty), faculty_controller_1.FacultyControllers.getAllFaculties);
exports.FacultyRouter = router;
