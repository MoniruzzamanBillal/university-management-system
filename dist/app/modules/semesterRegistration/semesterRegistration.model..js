"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.semesterRegistrationModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const semesterRegistration_constant_1 = require("./semesterRegistration.constant");
const semesterRegistrationSchema = new mongoose_1.Schema({
    academicSemester: {
        required: true,
        ref: "AcademicSemmester",
        type: mongoose_1.Schema.Types.ObjectId,
    },
    status: {
        type: String,
        enum: {
            values: semesterRegistration_constant_1.SemesterRegistrationStatus,
            message: "{VALUE} is not a valid semester status",
        },
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    minCredit: {
        type: Number,
        required: true,
        default: 3,
    },
    maxCredit: {
        type: Number,
        required: true,
        default: 16,
    },
}, { timestamps: true });
exports.semesterRegistrationModel = mongoose_1.default.model("SemesterRegistration", semesterRegistrationSchema);
