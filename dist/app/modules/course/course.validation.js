"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseValidations = void 0;
const zod_1 = require("zod");
// Zod schema for TPreRequisitCourses
const preRequisiteCourseSchema = zod_1.z.object({
    course: zod_1.z.string(), //
    isDeleted: zod_1.z.boolean().default(false).optional(),
});
// Zod schema for TCourse
const createCourseValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, { message: "Course title is required" }),
        prefix: zod_1.z.string().min(1, { message: "Course prefix is required" }),
        code: zod_1.z
            .number()
            .nonnegative({ message: "Course code must be a non-negative number" }),
        credit: zod_1.z
            .number()
            .nonnegative({ message: "Course credit must be a non-negative number" }),
        preRequisiteCourses: zod_1.z.array(preRequisiteCourseSchema).optional(),
    }),
});
exports.courseValidations = {
    createCourseValidationSchema,
};
