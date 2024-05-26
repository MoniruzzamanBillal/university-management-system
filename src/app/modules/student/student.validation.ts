import { z } from "zod";

const userNameValidationSchema = z.object({
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

const guardianValidationSchema = z.object({
  fatherName: z.string().trim(),
  fatherOccupation: z.string().trim(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

const localGuardianValidationSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

const studentValidationSchema = z.object({
  id: z.string(),
  user: z.string().regex(/^[a-f\d]{24}$/i, "Invalid ObjectId"),
  password: z.string(),
  name: userNameValidationSchema,
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
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImg: z.string().optional(),
  isDeleted: z.boolean().default(false),
});

export {
  studentValidationSchema,
  userNameValidationSchema,
  guardianValidationSchema,
  localGuardianValidationSchema,
};
