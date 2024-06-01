"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentValidations = void 0;
const zod_1 = require("zod");
const CreateuserNameValidationSchema = zod_1.z.object({
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
const UpdateuserNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .trim()
        .max(20, "Name can not be more than 20 characters")
        .optional(),
    middleName: zod_1.z.string().trim().optional().optional(),
    lastName: zod_1.z
        .string()
        .trim()
        .max(20, "Name can not be more than 20 characters")
        .optional(),
});
const CreateguardianValidationSchema = zod_1.z.object({
    fatherName: zod_1.z.string().trim(),
    fatherOccupation: zod_1.z.string().trim(),
    fatherContactNo: zod_1.z.string(),
    motherName: zod_1.z.string(),
    motherOccupation: zod_1.z.string(),
    motherContactNo: zod_1.z.string(),
});
const UpdateguardianValidationSchema = zod_1.z.object({
    fatherName: zod_1.z.string().trim().optional(),
    fatherOccupation: zod_1.z.string().trim().optional(),
    fatherContactNo: zod_1.z.string().optional(),
    motherName: zod_1.z.string().optional(),
    motherOccupation: zod_1.z.string().optional(),
    motherContactNo: zod_1.z.string().optional(),
});
const CreatelocalGuardianValidationSchema = zod_1.z.object({
    name: zod_1.z.string(),
    occupation: zod_1.z.string(),
    contactNo: zod_1.z.string(),
    address: zod_1.z.string(),
});
const UpdatelocalGuardianValidationSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    occupation: zod_1.z.string().optional(),
    contactNo: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
});
const createStudentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string(),
        student: zod_1.z.object({
            name: CreateuserNameValidationSchema,
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
            guardian: CreateguardianValidationSchema,
            localGuardian: CreatelocalGuardianValidationSchema,
            admissionSemester: zod_1.z.string(),
            profileImg: zod_1.z.string().optional(),
        }),
    }),
});
const UpdateStudentValidationSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        student: zod_1.z.object({
            name: UpdateuserNameValidationSchema.optional(),
            gender: zod_1.z.enum(["male", "female", "other"]).optional(),
            dateOfBirth: zod_1.z.string().optional().optional(),
            email: zod_1.z.string().email("Invalid email address").optional(),
            contactNo: zod_1.z.string().optional(),
            emergencyContactNo: zod_1.z.string().optional(),
            bloodGroup: zod_1.z
                .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
                .optional()
                .optional(),
            presentAddress: zod_1.z.string().optional(),
            permanentAddress: zod_1.z.string().optional(),
            guardian: UpdateguardianValidationSchema.optional(),
            localGuardian: UpdatelocalGuardianValidationSchema.optional(),
            admissionSemester: zod_1.z.string().optional(),
            profileImg: zod_1.z.string().optional(),
        }),
    })
        .optional(),
});
exports.studentValidations = {
    createStudentValidationSchema,
    UpdateStudentValidationSchema,
};
