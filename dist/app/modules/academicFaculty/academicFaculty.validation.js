"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicFacultyValidation = void 0;
const zod_1 = require("zod");
const createAcademicFacultyValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            invalid_type_error: "Academic faculty  must e string !!! ",
        }),
    }),
});
const updateAcademicFacultyValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            invalid_type_error: "Academic faculty  must e string !!! ",
        })
            .optional(),
    }),
});
exports.academicFacultyValidation = {
    createAcademicFacultyValidationSchema,
    updateAcademicFacultyValidationSchema,
};
