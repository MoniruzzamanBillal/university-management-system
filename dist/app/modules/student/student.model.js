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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const AppError_1 = __importDefault(require("../../Error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const userNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, "First Name is required"],
        trim: true,
        maxlength: [20, "Name can not be more than 20 characters"],
    },
    middleName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, "Last Name is required"],
        maxlength: [20, "Name can not be more than 20 characters"],
    },
});
const guardianSchema = new mongoose_1.Schema({
    fatherName: {
        type: String,
        trim: true,
        required: [true, "Father Name is required"],
    },
    fatherOccupation: {
        type: String,
        trim: true,
        required: [true, "Father occupation is required"],
    },
    fatherContactNo: {
        type: String,
        required: [true, "Father Contact No is required"],
    },
    motherName: {
        type: String,
        required: [true, "Mother Name is required"],
    },
    motherOccupation: {
        type: String,
        required: [true, "Mother occupation is required"],
    },
    motherContactNo: {
        type: String,
        required: [true, "Mother Contact No is required"],
    },
});
const localGuradianSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    occupation: {
        type: String,
        required: [true, "Occupation is required"],
    },
    contactNo: {
        type: String,
        required: [true, "Contact number is required"],
    },
    address: {
        type: String,
        required: [true, "Address is required"],
    },
});
const studentSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: [true, "ID is required"],
        unique: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "User id is required"],
        unique: true,
        ref: "User",
    },
    name: {
        type: userNameSchema,
        required: [true, "Name is required"],
    },
    gender: {
        type: String,
        enum: {
            values: ["male", "female", "other"],
            message: "{VALUE} is not a valid gender",
        },
        required: [true, "Gender is required"],
    },
    dateOfBirth: { type: Date },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    contactNo: { type: String, required: [true, "Contact number is required"] },
    emergencyContactNo: {
        type: String,
        required: [true, "Emergency contact number is required"],
    },
    bloogGroup: {
        type: String,
        enum: {
            values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
            message: "{VALUE} is not a valid blood group",
        },
    },
    presentAddress: {
        type: String,
        required: [true, "Present address is required"],
    },
    permanentAddress: {
        type: String,
        required: [true, "Permanent address is required"],
    },
    guardian: {
        type: guardianSchema,
        required: [true, "Guardian information is required"],
    },
    localGuardian: {
        type: localGuradianSchema,
        required: [true, "Local guardian information is required"],
    },
    profileImg: { type: String },
    admissionSemester: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "AcademicSemmester",
    },
    AcademicDepartment: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "AcademicDepartment",
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
studentSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const isStudentExist = yield exports.StudentModel.findOne({
            email: this.email,
            id: this.id,
        });
        if (isStudentExist) {
            throw new AppError_1.default(http_status_1.default.NOT_MODIFIED, "Student already exist with same email or ID !!");
        }
        next();
    });
});
studentSchema.pre("findOneAndUpdate", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = this.getQuery();
        const studentData = yield exports.StudentModel.findOne(query);
        if (studentData === null || studentData === void 0 ? void 0 : studentData.isDeleted) {
            return next(new AppError_1.default(http_status_1.default.BAD_REQUEST, "User don't exist "));
        }
        next();
    });
});
exports.StudentModel = mongoose_1.default.model("Student", studentSchema);
