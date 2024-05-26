import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

// ! for creating a studennt
router.post("/create-student", userController.createStudent);

// ! for creating a faculty
router.post("/create-faculty", async (req, res) => {
  res.send({ message: "create struudent !! " });
});

// ! for creating a admin
router.post("/create-admin", async (req, res) => {
  res.send({ message: "create struudent !! " });
});

//

export const userRouter = router;
