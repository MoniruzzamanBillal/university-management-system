import express from "express";
import { userController } from "./user.controller";

import { studentValidations } from "../student/student.validation";
import validateRequest from "../../middleware/validaateRequest";
import { createFacultyValidationSchema } from "../Faculty/faculty.validation";
import { createAdminValidationSchema } from "../Admin/admin.validation";

const router = express.Router();

// ! for creating a studennt
router.post(
  "/create-student",
  validateRequest(studentValidations.createStudentValidationSchema),
  userController.createStudent
);

// ! for creating a faculty
router.post(
  "/create-faculty",
  validateRequest(createFacultyValidationSchema),
  userController.createFaculty
);

// ! for creating a admin
router.post(
  "/create-admin",
  validateRequest(createAdminValidationSchema),
  userController.createAdmin
);
// ! for getting all student data
router.get("/", userController.getAllUser);

//

export const userRouter = router;
