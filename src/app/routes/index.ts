import { Router } from "express";
import { userRouter } from "../modules/user/user.route";
import { StudentRouter } from "../modules/student/student.route";
import { academicSemesterRouter } from "../modules/academicSemester/academicSemester.route";

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
];

modularRouter.forEach((route) => {
  router.use(route.path, route.route);
});

export const mainRouter = router;
