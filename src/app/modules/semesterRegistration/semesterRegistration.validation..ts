import { z } from "zod";
import { SemesterRegistrationStatus } from "./semesterRegistration.constant";

const createSemesterRegistrationValidations = z.object({
  body: z.object({
    academicSemester: z.string(),
    status: z.enum(SemesterRegistrationStatus),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    minCredit: z.number().default(3),
    maxCredit: z.number().default(16),
  }),
});
const updateSemesterRegistrationValidations = z.object({
  body: z.object({
    academicSemester: z.string().optional(),
    status: z.enum(SemesterRegistrationStatus).optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    minCredit: z.number().default(3).optional(),
    maxCredit: z.number().default(16).optional(),
  }),
});

export const semesterRegistrationValidation = {
  createSemesterRegistrationValidations,
  updateSemesterRegistrationValidations,
};
