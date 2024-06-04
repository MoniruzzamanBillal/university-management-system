import { Router } from "express";
import validateRequest from "../../middleware/validaateRequest";
import { courseContriollers } from "./course.controller";
import { courseValidations } from "./course.validation";

const router = Router();

router.post(
  "/create-course",
  validateRequest(courseValidations.createCourseValidationSchema),
  courseContriollers.createCourse
);
router.get("/courses", courseContriollers.getAllCourses);
router.get("/course/:id", courseContriollers.getCourse);
router.patch(
  "/course/:id",
  validateRequest(courseValidations.updateCourseValidationSchema),
  courseContriollers.updateCourseInfo
);
router.delete("/course/:id", courseContriollers.deleteCourse);

export const courseRouter = router;
