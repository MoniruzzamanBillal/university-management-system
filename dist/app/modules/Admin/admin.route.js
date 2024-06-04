"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = require("express");
const admin_controller_1 = require("./admin.controller");
const validaateRequest_1 = __importDefault(require("../../middleware/validaateRequest"));
const admin_validation_1 = require("./admin.validation");
const router = (0, express_1.Router)();
router.get("/", admin_controller_1.AdminControllers.getAllAdmins);
router.get("/:id", admin_controller_1.AdminControllers.getSingleAdmin);
router.patch("/:id", (0, validaateRequest_1.default)(admin_validation_1.updateAdminValidationSchema), admin_controller_1.AdminControllers.updateAdmin);
router.delete("/:adminId", admin_controller_1.AdminControllers.deleteAdmin);
exports.AdminRoutes = router;
