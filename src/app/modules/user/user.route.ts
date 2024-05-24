import express from "express";

const router = express.Router();

// ! for creating a studennt
router.post("/users/create-student", async (req, res) => {
  res.send({ message: "create struudent !! " });
});

// ! for creating a faculty
router.post("/users/create-faculty", async (req, res) => {
  res.send({ message: "create struudent !! " });
});

// ! for creating a admin
router.post("/users/create-admin", async (req, res) => {
  res.send({ message: "create struudent !! " });
});

//

export const userRouter = router;
