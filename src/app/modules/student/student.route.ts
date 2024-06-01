import express from "express";
import { StudentControllers } from "./student.controller";
import validateRequest from "../../middleware/validaateRequest";
import { studentValidations } from "./student.validation";

const router = express.Router();

router.get("/:studentId", StudentControllers.getSingleStudent);

router.patch(
  "/:studentId",
  validateRequest(studentValidations.UpdateStudentValidationSchema),
  StudentControllers.updateStudent
);

router.delete("/:studentId", StudentControllers.deleteStudent);

router.get("/", StudentControllers.getAllStudents);

export const StudentRouter = router;
