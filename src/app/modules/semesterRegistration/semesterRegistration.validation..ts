import { z } from "zod";
import { RegistrationStatus } from "./semesterRegistration.constant";

const createSemesterRegistrationValidations = z.object({
  body: z.object({
    academicSemester: z.string(),
    status: z.enum(RegistrationStatus),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    minCredit: z.number().min(3).default(3),
    maxCredit: z.number().max(16).default(16),
  }),
});
const updateSemesterRegistrationValidations = z.object({
  body: z.object({
    academicSemester: z.string(),
    status: z.enum(RegistrationStatus).optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    minCredit: z.number().min(3).default(3).optional(),
    maxCredit: z.number().max(16).default(16).optional(),
  }),
});

export const semesterRegistrationValidation = {
  createSemesterRegistrationValidations,
  updateSemesterRegistrationValidations,
};
