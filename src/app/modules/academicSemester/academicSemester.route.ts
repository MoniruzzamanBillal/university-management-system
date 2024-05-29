import { Router } from "express";

import { academicSemesterZodSchemas } from "./academicSemester.validation";
import validateRequest from "../../middleware/validaateRequest";
import { academicSemesterController } from "./academicSemester.controller";

const router = Router();

router.post(
  "/create-semester",
  validateRequest(academicSemesterZodSchemas.createAcademicSemesterSchema),
  academicSemesterController.createSemester
);

router.get("/get-semesters", academicSemesterController.getSmesters);
router.get("/get-semester/:semesterId", academicSemesterController.getSemester);
router.put(
  "/update-semester/:semesterId",
  validateRequest(
    academicSemesterZodSchemas.updatedAcademicSemesterSchemaValidationSchema
  ),
  academicSemesterController.updateSemester
);

export const academicSemesterRouter = router;
