import { Router } from "express";
import validateRequest from "../../middleware/validaateRequest";
import { authValidationSchema } from "./auth.validation";
import { authController } from "./auth.controller";
import authValidation from "../../middleware/authValidation";
import { UserRole } from "../user/user.constant";

const router = Router();

router.post(
  "/login",
  validateRequest(authValidationSchema.loginValidationSchema),
  authController.loginUser
);
router.post(
  "/change-Password",
  authValidation(UserRole.student, UserRole.faculty, UserRole.admin),
  validateRequest(authValidationSchema.changePasswordValidationSchema),
  authController.changePassword
);
router.post(
  "/refresh-token",
  validateRequest(authValidationSchema.refreshTokenValidationSchema),
  authController.refreshToken
);

export const authRouter = router;
