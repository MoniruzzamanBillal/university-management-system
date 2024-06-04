import { z } from "zod";

// Zod schema for TPreRequisitCourses
const preRequisiteCourseSchema = z.object({
  course: z.string(), //
  isDeleted: z.boolean().default(false).optional(),
});

// Zod schema for TCourse
const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, { message: "Course title is required" }),
    prefix: z.string().min(1, { message: "Course prefix is required" }),
    code: z
      .number()
      .nonnegative({ message: "Course code must be a non-negative number" }),
    credit: z
      .number()
      .nonnegative({ message: "Course credit must be a non-negative number" }),
    preRequisiteCourses: z.array(preRequisiteCourseSchema).optional(),
  }),
});

export const courseValidations = {
  createCourseValidationSchema,
};
