import { Router } from "express";
import { FacultyControllers } from "./faculty.controller";
import validateRequest from "../../middleware/validaateRequest";
import { updateFacultyValidationSchema } from "./faculty.validation";
import authValidation from "../../middleware/authValidation";

const router = Router();

router.get("/:id", FacultyControllers.getSingleFaculty);

router.patch(
  "/:id",
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty
);

router.delete("/:id", FacultyControllers.deleteFaculty);

router.get("/", authValidation(), FacultyControllers.getAllFaculties);

export const FacultyRouter = router;
