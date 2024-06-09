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
const router = (0, express_1.Router)();
router.post("/login", (0, validaateRequest_1.default)(auth_validation_1.authValidationSchema.loginValidationSchema), auth_controller_1.authController.loginUser);
exports.authRouter = router;
