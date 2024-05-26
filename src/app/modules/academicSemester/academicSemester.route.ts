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

export const academicSemesterRouter = router;
