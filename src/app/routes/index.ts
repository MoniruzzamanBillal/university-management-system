import { Router } from "express";
import { userRouter } from "../modules/user/user.route";
import { StudentRouter } from "../modules/student/student.route";

const mainRouter = Router();

const modularRouter = [
  {
    path: "/users",
    route: userRouter,
  },
  {
    path: "/students",
    route: StudentRouter,
  },
];

modularRouter.forEach((route) => {
  mainRouter.use(route.path, route.route);
});

export default mainRouter;
