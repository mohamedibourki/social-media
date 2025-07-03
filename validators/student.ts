import { z } from "zod";

export const studentValidator = z.object({
  fullName: z.string()
    .min(3, { message: "Full name must be at least 3 characters" })
    .max(50, { message: "Full name must not exceed 50 characters" })
    .trim(),

  schoolEmail: z.string()
    .email({ message: "Invalid email format" })
    .toLowerCase()
    .trim(),

  password: z.string()
    .min(6, { message: "Password must be at least 6 characters" }),

  birthDay: z.coerce.date().refine(
    (date) => {
      const age = new Date().getFullYear() - date.getFullYear();
      return age >= 10;
    },
    { message: "Student must be at least 10 years old" }
  ),

  gender: z.enum(['Male', 'Female'], {
    required_error: "Gender is required",
    invalid_type_error: "Gender must be either 'Male' or 'Female'"
  }),

  className: z.string()
    .regex(/^[a-f\d]{24}$/i, { message: "Invalid MongoDB ObjectId for className" }),

  role: z.literal("Student").optional(),

});
