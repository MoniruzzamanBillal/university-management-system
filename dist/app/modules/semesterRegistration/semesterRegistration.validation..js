"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.semesterRegistrationValidation = void 0;
const zod_1 = require("zod");
const semesterRegistration_constant_1 = require("./semesterRegistration.constant");
const createSemesterRegistrationValidations = zod_1.z.object({
    body: zod_1.z.object({
        academicSemester: zod_1.z.string(),
        status: zod_1.z.enum(semesterRegistration_constant_1.RegistrationStatus),
        startDate: zod_1.z.string().datetime(),
        endDate: zod_1.z.string().datetime(),
        minCredit: zod_1.z.number().default(3),
        maxCredit: zod_1.z.number().default(16),
    }),
});
const updateSemesterRegistrationValidations = zod_1.z.object({
    body: zod_1.z.object({
        academicSemester: zod_1.z.string().optional(),
        status: zod_1.z.enum(semesterRegistration_constant_1.RegistrationStatus).optional(),
        startDate: zod_1.z.string().datetime().optional(),
        endDate: zod_1.z.string().datetime().optional(),
        minCredit: zod_1.z.number().default(3).optional(),
        maxCredit: zod_1.z.number().default(16).optional(),
    }),
});
exports.semesterRegistrationValidation = {
    createSemesterRegistrationValidations,
    updateSemesterRegistrationValidations,
};
