import { Router } from "express";
import validateRequest from "../../middleware/validaateRequest";
import { AcademicDepartmentValidation } from "./academicDepartment.validation";
import { academicDepartmentController } from "./academicDepartment.controller";

const router = Router();

router.post(
  "/create-department",
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentValidationSchema
  ),
  academicDepartmentController.createAcademicDepartment
);

router.get(
  "/all-department",
  academicDepartmentController.getAllAcademicDepartment
);
router.get(
  "/department/:id",
  academicDepartmentController.getSpecificAcademicDepartment
);
router.put(
  "/department/:id",
  academicDepartmentController.updateSpecificAcademicDepartment
);

export const academicDepartmentRouter = router;
