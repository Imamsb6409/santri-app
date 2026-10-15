import { z } from "zod";

// Schema untuk Sign Up (Registrasi)
export const signUpSchema = z.object({
  name: z
    .string()
    .min(1, "Nama lengkap wajib diisi"),
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),
  password: z
    .string()
    .min(6, "Password minimal 6 karakter"),
});

// Schema untuk Sign In (Login)
export const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),
  password: z
    .string()
    .min(1, "Password wajib diisi"),
});