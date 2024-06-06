import { Router } from "express";
import { semesterRegistrationController } from "./semesterRegistration.controller";
import validateRequest from "../../middleware/validaateRequest";
import { semesterRegistrationValidation } from "./semesterRegistration.validation.";

const router = Router();

router.get("/", semesterRegistrationController.getAllSemesterRegistrations);

router.get(
  "/:id",
  semesterRegistrationController.getSingleSemesterRegistration
);

router.post(
  "/create-semester-registration",
  validateRequest(
    semesterRegistrationValidation.createSemesterRegistrationValidations
  ),
  semesterRegistrationController.createSemesterRegistration
);

router.patch(
  "/:id",
  validateRequest(
    semesterRegistrationValidation.updateSemesterRegistrationValidations
  ),
  semesterRegistrationController.updateSemesterRegistration
);

router.delete(
  "/:id",
  semesterRegistrationController.deleteSemesterRegistration
);

export const semesterRegistrationRouter = router;
