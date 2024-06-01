"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicFacultyModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const academicFacultySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        require: [true, "Academic faculty name is required!!"],
        unique: true,
    },
});
exports.academicFacultyModel = mongoose_1.default.model("AcademicFaculty", academicFacultySchema);
