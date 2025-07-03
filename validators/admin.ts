import { z } from "zod";

export const adminValidator = z.object({
  fullName: z.string()
    .min(3, { message: "Full name must be at least 3 characters" })
    .max(50, { message: "Full name must not exceed 50 characters" })
    .trim(),

  email: z.string()
    .email({ message: "Invalid email format" })
    .toLowerCase()
    .trim(),

  password: z.string()
    .min(6, { message: "Password must be at least 6 characters" }),

  role: z.enum(['Teacher', 'GS'], {
    required_error: "Role is required",
    invalid_type_error: "Role must be either 'Teacher' or 'GS'"
  }),

});
