import { Router } from "express";
import validateRequest from "../../middleware/validaateRequest";
import { authValidationSchema } from "./auth.validation";
import { authController } from "./auth.controller";

const router = Router();

router.post(
  "/login",
  validateRequest(authValidationSchema.loginValidationSchema),
  authController.loginUser
);

export const authRouter = router;
