"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.localGuardianValidationSchema = exports.guardianValidationSchema = exports.userNameValidationSchema = exports.studentValidationSchema = void 0;
const zod_1 = require("zod");
const userNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .trim()
        .max(20, "Name can not be more than 20 characters"),
    middleName: zod_1.z.string().trim().optional(),
    lastName: zod_1.z
        .string()
        .trim()
        .max(20, "Name can not be more than 20 characters"),
});
exports.userNameValidationSchema = userNameValidationSchema;
const guardianValidationSchema = zod_1.z.object({
    fatherName: zod_1.z.string().trim(),
    fatherOccupation: zod_1.z.string().trim(),
    fatherContactNo: zod_1.z.string(),
    motherName: zod_1.z.string(),
    motherOccupation: zod_1.z.string(),
    motherContactNo: zod_1.z.string(),
});
exports.guardianValidationSchema = guardianValidationSchema;
const localGuardianValidationSchema = zod_1.z.object({
    name: zod_1.z.string(),
    occupation: zod_1.z.string(),
    contactNo: zod_1.z.string(),
    address: zod_1.z.string(),
});
exports.localGuardianValidationSchema = localGuardianValidationSchema;
const studentValidationSchema = zod_1.z.object({
    id: zod_1.z.string(),
    user: zod_1.z.string().regex(/^[a-f\d]{24}$/i, "Invalid ObjectId"),
    password: zod_1.z.string(),
    name: userNameValidationSchema,
    gender: zod_1.z.enum(["male", "female", "other"]),
    dateOfBirth: zod_1.z.string().optional(),
    email: zod_1.z.string().email("Invalid email address"),
    contactNo: zod_1.z.string(),
    emergencyContactNo: zod_1.z.string(),
    bloodGroup: zod_1.z
        .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
        .optional(),
    presentAddress: zod_1.z.string(),
    permanentAddress: zod_1.z.string(),
    guardian: guardianValidationSchema,
    localGuardian: localGuardianValidationSchema,
    profileImg: zod_1.z.string().optional(),
    isDeleted: zod_1.z.boolean().default(false),
});
exports.studentValidationSchema = studentValidationSchema;
