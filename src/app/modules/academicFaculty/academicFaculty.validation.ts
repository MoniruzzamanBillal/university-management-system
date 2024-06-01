import { z } from "zod";

const createAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Academic faculty  must e string !!! ",
    }),
  }),
});

const updateAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "Academic faculty  must e string !!! ",
      })
      .optional(),
  }),
});

export const academicFacultyValidation = {
  createAcademicFacultyValidationSchema,
  updateAcademicFacultyValidationSchema,
};