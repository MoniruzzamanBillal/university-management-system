import express from "express";
import { userController } from "./user.controller";

import { studentValidations } from "../student/student.validation";
import validateRequest from "../../middleware/validaateRequest";

const router = express.Router();

// ! for creating a studennt
router.post(
  "/create-student",
  validateRequest(studentValidations.createStudentValidationSchema),
  userController.createStudent
);

// ! for creating a faculty
router.post("/create-faculty", async (req, res) => {
  res.send({ message: "create struudent !! " });
});

// ! for creating a admin
router.post("/create-admin", async (req, res) => {
  res.send({ message: "create struudent !! " });
});

// ! for getting all student data
router.get("/", userController.getAllUser);

//

export const userRouter = router;
