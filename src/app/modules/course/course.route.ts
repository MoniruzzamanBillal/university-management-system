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
router.get("/allCourses", courseContriollers.getAllCourses);
router.get("/:id", courseContriollers.getCourse);
router.patch(
  "/:id",
  validateRequest(courseValidations.updateCourseValidationSchema),
  courseContriollers.updateCourseInfo
);

router.put(
  "/:courseId/assign-faculty",
  validateRequest(courseValidations.FacultyValidationSchema),
  courseContriollers.assignFacultyToCourse
);

router.delete(
  "/:courseId/remove-faculty",
  validateRequest(courseValidations.FacultyValidationSchema),
  courseContriollers.removeFacultyToCourse
);

router.delete("/:id", courseContriollers.deleteCourse);

export const courseRouter = router;
