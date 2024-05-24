import { z } from "zod";

export const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: "password mustt be string ",
    })
    .max(20, "password can not be more than 20 characters ")
    .optional(),
});
