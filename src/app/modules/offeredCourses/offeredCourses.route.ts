import { Router } from "express";
import { offeredCourseController } from "./offeredCourse.controller";
import { OfferedCourseValidations } from "./offeredCourse.validation";
import validateRequest from "../../middleware/validaateRequest";

const router = Router();

router.get("/", offeredCourseController.getAllOfferedCourses);

router.get("/:id", offeredCourseController.getSingleOfferedCourses);

router.post(
  "/create-offered-course",
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  offeredCourseController.createOfferedCourse
);

router.patch(
  "/:id",
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  offeredCourseController.updateOfferedCourse
);

router.delete("/:id", offeredCourseController.deleteOfferedCourseFromDB);

export const offeredCourseRoutes = router;
