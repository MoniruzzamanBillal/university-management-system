import { z } from "zod";

// Zod schema for TPreRequisitCourses
const createPreRequisiteCourseSchema = z.object({
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
    preRequisiteCourses: z.array(createPreRequisiteCourseSchema).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const updatePreRequisiteCourseSchema = z.object({
  course: z.string().optional(), //
  isDeleted: z.boolean().default(false).optional(),
});

const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, { message: "Course title is required" })
      .optional(),
    prefix: z
      .string()
      .min(1, { message: "Course prefix is required" })
      .optional(),
    code: z
      .number()
      .nonnegative({ message: "Course code must be a non-negative number" })
      .optional(),
    credit: z
      .number()
      .nonnegative({ message: "Course credit must be a non-negative number" })
      .optional(),
    preRequisiteCourses: z.array(updatePreRequisiteCourseSchema).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const addFacultyValidationSchema = z.object({
  body: z.object({
    course: z.string().optional(),
    faculties: z.array(z.string()),
  }),
});

//
export const courseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
  addFacultyValidationSchema,
};
