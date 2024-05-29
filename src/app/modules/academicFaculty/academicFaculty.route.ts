import { Router } from "express";
import { academicFacultyController } from "./academicFaculty.controller";
import validateRequest from "../../middleware/validaateRequest";
import { academicFacultyValidation } from "./academicFaculty.validation";

const router = Router();

router.post(
  "/create-faculty",
  validateRequest(
    academicFacultyValidation.createAcademicFacultyValidationSchema
  ),
  academicFacultyController.createAcademicFaculty
);
router.get("/get-faculty", academicFacultyController.getAllFaculty);
router.get("/get-faculty/:id", academicFacultyController.getFaculty);
router.put(
  "/update-faculty/:id",
  validateRequest(
    academicFacultyValidation.updateAcademicFacultyValidationSchema
  ),
  academicFacultyController.updateFaculty
);

export const academicFacultyRouter = router;
