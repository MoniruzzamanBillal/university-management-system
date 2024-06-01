"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicSemesterZodSchemas = void 0;
const zod_1 = require("zod");
const academicSemester_constant_1 = require("./academicSemester.constant");
const monthsSchema = zod_1.z.enum([...academicSemester_constant_1.months]);
const academicSemesterNameSchema = zod_1.z.enum([...academicSemester_constant_1.academicSemesterName]);
const academicSemesterCodeSchema = zod_1.z.enum([...academicSemester_constant_1.academicSemesterCode]);
const createAcademicSemesterSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: academicSemesterNameSchema,
        code: academicSemesterCodeSchema,
        year: zod_1.z.string(),
        startMonth: monthsSchema,
        endMonth: monthsSchema,
    }),
});
const updatedAcademicSemesterSchemaValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: academicSemesterNameSchema.optional(),
        code: academicSemesterCodeSchema.optional(),
        year: zod_1.z.string().optional(),
        startMonth: monthsSchema.optional(),
        endMonth: monthsSchema.optional(),
    }),
});
//! Export the schemas
exports.academicSemesterZodSchemas = {
    createAcademicSemesterSchema,
    monthsSchema,
    academicSemesterNameSchema,
    academicSemesterCodeSchema,
    updatedAcademicSemesterSchemaValidationSchema,
};
