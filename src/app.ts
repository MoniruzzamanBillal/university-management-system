import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";

import { userRouter } from "./app/modules/user/user.route";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import httpStatus from "http-status";
import mainRouter from "./app/routes";

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// ! rouutes

app.use("/api/v1", mainRouter);

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send({ message: "server is running  !! " });
  } catch (error) {
    next(error);
  }
});

//! not found route
app.all("*", async (req: Request, res: Response) => {
  res
    .status(httpStatus.NOT_FOUND)
    .json({ success: false, message: "Route not found " });
});

// !global error handler
app.use(globalErrorHandler);

export default app;
