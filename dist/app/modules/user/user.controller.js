"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("./user.service");
// ! function for creating a student
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, student: studentData } = req.body;
        const result = yield user_service_1.userServices.createStudentIntoDB(password, studentData);
        res.status(200).json({
            success: true,
            message: "New student created successfully !!",
            data: result,
        });
    }
    catch (error) {
        res
            .status(400)
            .json({ success: false, message: error.message, error: error });
    }
});
// ! function for creating a faculty
const createFaculty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
    }
    catch (error) {
        res
            .status(400)
            .json({ success: false, message: error.message, error: error });
    }
});
// ! function for creating an admin
const createAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
    }
    catch (error) {
        res
            .status(400)
            .json({ success: false, message: error.message, error: error });
    }
});
//
exports.userController = {
    createStudent,
    createFaculty,
    createAdmin,
};
