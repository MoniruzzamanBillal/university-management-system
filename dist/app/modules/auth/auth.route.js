"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const validaateRequest_1 = __importDefault(require("../../middleware/validaateRequest"));
const auth_validation_1 = require("./auth.validation");
const auth_controller_1 = require("./auth.controller");
const authValidation_1 = __importDefault(require("../../middleware/authValidation"));
const user_constant_1 = require("../user/user.constant");
const router = (0, express_1.Router)();
router.post("/login", (0, validaateRequest_1.default)(auth_validation_1.authValidationSchema.loginValidationSchema), auth_controller_1.authController.loginUser);
router.post("/change-Password", (0, authValidation_1.default)(user_constant_1.UserRole.student, user_constant_1.UserRole.faculty, user_constant_1.UserRole.admin), (0, validaateRequest_1.default)(auth_validation_1.authValidationSchema.changePasswordValidationSchema), auth_controller_1.authController.changePassword);
router.post("/refresh-token", (0, validaateRequest_1.default)(auth_validation_1.authValidationSchema.refreshTokenValidationSchema), auth_controller_1.authController.refreshToken);
exports.authRouter = router;
