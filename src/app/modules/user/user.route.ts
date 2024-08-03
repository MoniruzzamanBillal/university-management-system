import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";

import { studentValidations } from "../student/student.validation";
import validateRequest from "../../middleware/validaateRequest";
import { createFacultyValidationSchema } from "../Faculty/faculty.validation";
import { createAdminValidationSchema } from "../Admin/admin.validation";
import authValidation from "../../middleware/authValidation";
import { UserRole } from "./user.constant";
import { upload } from "../../util/SendImageCloudinary";

const router = express.Router();

// ! for creating a studennt
router.post(
  "/create-student",
  authValidation(UserRole.admin),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);

    next();
  },
  validateRequest(studentValidations.createStudentValidationSchema),
  userController.createStudent
);

// ! for creating a faculty
router.post(
  "/create-faculty",
  authValidation(UserRole.admin),
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
