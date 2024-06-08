import { Router } from "express";
import { userRouter } from "../modules/user/user.route";
import { StudentRouter } from "../modules/student/student.route";
import { academicSemesterRouter } from "../modules/academicSemester/academicSemester.route";
import { academicFacultyRouter } from "../modules/academicFaculty/academicFaculty.route";
import { academicDepartmentRouter } from "../modules/academicDepartment/academicDepartment.route";
import { FacultyRouter } from "../modules/Faculty/faculty.route";
import { courseRouter } from "../modules/course/course.route";
import { semesterRegistrationRouter } from "../modules/semesterRegistration/semesterRegistration.route";
import { offeredCourseRoutes } from "../modules/offeredCourses/offeredCourses.route";
import { authRouter } from "../modules/auth/auth.route";

const router = Router();

const modularRouter = [
  {
    path: "/users",
    route: userRouter,
  },
  {
    path: "/students",
    route: StudentRouter,
  },
  {
    path: "/academic-semester",
    route: academicSemesterRouter,
  },
  {
    path: "/academic-faculty",
    route: academicFacultyRouter,
  },
  {
    path: "/academic-department",
    route: academicDepartmentRouter,
  },
  {
    path: "/faculty",
    route: FacultyRouter,
  },
  {
    path: "/course",
    route: courseRouter,
  },
  {
    path: "/semester-registrations",
    route: semesterRegistrationRouter,
  },
  {
    path: "/offered-courses",
    route: offeredCourseRoutes,
  },
  {
    path: "/auth",
    route: authRouter,
  },
];

modularRouter.forEach((route) => {
  router.use(route.path, route.route);
});

export const mainRouter = router;
