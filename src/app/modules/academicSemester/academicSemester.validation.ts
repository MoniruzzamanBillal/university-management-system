import { z } from "zod";
import {
  academicSemesterCode,
  academicSemesterName,
  months,
} from "./academicSemester.constant";

const monthsSchema = z.enum([...months] as [string, ...string[]]);

const academicSemesterNameSchema = z.enum([...academicSemesterName] as [
  string,
  ...string[],
]);

const academicSemesterCodeSchema = z.enum([...academicSemesterCode] as [
  string,
  ...string[],
]);

const createAcademicSemesterSchema = z.object({
  body: z.object({
    name: academicSemesterNameSchema,
    code: academicSemesterCodeSchema,
    year: z.string(),
    startMonth: monthsSchema,
    endMonth: monthsSchema,
  }),
});

const updatedAcademicSemesterSchemaValidationSchema = z.object({
  body: z.object({
    name: academicSemesterNameSchema.optional(),
    code: academicSemesterCodeSchema.optional(),
    year: z.string().optional(),
    startMonth: monthsSchema.optional(),
    endMonth: monthsSchema.optional(),
  }),
});

//! Export the schemas
export const academicSemesterZodSchemas = {
  createAcademicSemesterSchema,
  monthsSchema,
  academicSemesterNameSchema,
  academicSemesterCodeSchema,
  updatedAcademicSemesterSchemaValidationSchema,
};
