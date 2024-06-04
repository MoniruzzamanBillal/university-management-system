"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const student_validation_1 = require("../student/student.validation");
const validaateRequest_1 = __importDefault(require("../../middleware/validaateRequest"));
const faculty_validation_1 = require("../Faculty/faculty.validation");
const admin_validation_1 = require("../Admin/admin.validation");
const router = express_1.default.Router();
// ! for creating a studennt
router.post("/create-student", (0, validaateRequest_1.default)(student_validation_1.studentValidations.createStudentValidationSchema), user_controller_1.userController.createStudent);
// ! for creating a faculty
router.post("/create-faculty", (0, validaateRequest_1.default)(faculty_validation_1.createFacultyValidationSchema), user_controller_1.userController.createFaculty);
// ! for creating a admin
router.post("/create-admin", (0, validaateRequest_1.default)(admin_validation_1.createAdminValidationSchema), user_controller_1.userController.createAdmin);
// ! for getting all student data
router.get("/", user_controller_1.userController.getAllUser);
//
exports.userRouter = router;
