import { Router } from "express";
import { userRouter } from "../modules/user/user.route";

const mainRouter = Router();

const modularRouter = [
  {
    path: "/users",
    route: userRouter,
  },
];

modularRouter.forEach((route) => {
  mainRouter.use(route.path, route.route);
});

export default mainRouter;
