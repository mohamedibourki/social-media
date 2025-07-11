import { z } from 'zod';

export const authSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  username: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  profilePicture: z.string().url().optional(),
  role: z.enum(["STUDENT", "TEACHER", "ADMIN"]).optional(),
  clubId: z.string().optional()
})
