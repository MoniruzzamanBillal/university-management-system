"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.semesterRegistrationRouter = void 0;
const express_1 = require("express");
const semesterRegistration_controller_1 = require("./semesterRegistration.controller");
const validaateRequest_1 = __importDefault(require("../../middleware/validaateRequest"));
const semesterRegistration_validation_1 = require("./semesterRegistration.validation.");
const router = (0, express_1.Router)();
router.get("/", semesterRegistration_controller_1.semesterRegistrationController.getAllSemesterRegistrations);
router.get("/:id", semesterRegistration_controller_1.semesterRegistrationController.getSingleSemesterRegistration);
router.post("/create-semester-registration", (0, validaateRequest_1.default)(semesterRegistration_validation_1.semesterRegistrationValidation.createSemesterRegistrationValidations), semesterRegistration_controller_1.semesterRegistrationController.createSemesterRegistration);
router.patch("/:id", (0, validaateRequest_1.default)(semesterRegistration_validation_1.semesterRegistrationValidation.updateSemesterRegistrationValidations), semesterRegistration_controller_1.semesterRegistrationController.updateSemesterRegistration);
router.delete("/:id", semesterRegistration_controller_1.semesterRegistrationController.deleteSemesterRegistration);
exports.semesterRegistrationRouter = router;
