import { z } from "zod";

/**
 * Shared email/password rules used by both signup and login.
 *
 * ⚠️ LEARNING PROJECT ONLY:
 * Passwords are saved and compared in PLAINTEXT in this project (see
 * prisma/schema.prisma and the /api/auth/signup + /api/auth/login route
 * handlers). In a real app you would:
 *   1. Hash the password on signup with bcrypt/argon2 before saving it.
 *   2. Compare the submitted password against the hash on login
 *      (e.g. `bcrypt.compare(password, user.password)`) instead of a
 *      plain string equality check.
 */

export const signupSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(72, "Password must be at most 72 characters"),
});

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
