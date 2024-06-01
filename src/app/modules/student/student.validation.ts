import { z } from "zod";

const CreateuserNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, "Name can not be more than 20 characters"),
  middleName: z.string().trim().optional(),
  lastName: z
    .string()
    .trim()
    .max(20, "Name can not be more than 20 characters"),
});
const UpdateuserNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, "Name can not be more than 20 characters")
    .optional(),
  middleName: z.string().trim().optional().optional(),
  lastName: z
    .string()
    .trim()
    .max(20, "Name can not be more than 20 characters")
    .optional(),
});

const CreateguardianValidationSchema = z.object({
  fatherName: z.string().trim(),
  fatherOccupation: z.string().trim(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});
const UpdateguardianValidationSchema = z.object({
  fatherName: z.string().trim().optional(),
  fatherOccupation: z.string().trim().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
});

const CreatelocalGuardianValidationSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});
const UpdatelocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});

const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string(),
    student: z.object({
      name: CreateuserNameValidationSchema,
      gender: z.enum(["male", "female", "other"]),
      dateOfBirth: z.string().optional(),
      email: z.string().email("Invalid email address"),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z
        .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
        .optional(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: CreateguardianValidationSchema,
      localGuardian: CreatelocalGuardianValidationSchema,
      admissionSemester: z.string(),
      profileImg: z.string().optional(),
    }),
  }),
});
const UpdateStudentValidationSchema = z.object({
  body: z
    .object({
      student: z.object({
        name: UpdateuserNameValidationSchema.optional(),
        gender: z.enum(["male", "female", "other"]).optional(),
        dateOfBirth: z.string().optional().optional(),
        email: z.string().email("Invalid email address").optional(),
        contactNo: z.string().optional(),
        emergencyContactNo: z.string().optional(),
        bloodGroup: z
          .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
          .optional()
          .optional(),
        presentAddress: z.string().optional(),
        permanentAddress: z.string().optional(),
        guardian: UpdateguardianValidationSchema.optional(),
        localGuardian: UpdatelocalGuardianValidationSchema.optional(),
        admissionSemester: z.string().optional(),
        profileImg: z.string().optional(),
      }),
    })
    .optional(),
});

export const studentValidations = {
  createStudentValidationSchema,
  UpdateStudentValidationSchema,
};
