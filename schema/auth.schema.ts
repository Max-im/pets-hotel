import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().trim().email().toLowerCase(),
    password: z.string().min(5).max(255),
}).transform((data) => {
    return {
        ...data,
    };
});

export type TLoginForm = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
    email: z.string().trim().email().toLowerCase(),
    password: z.string().min(5).max(255),
    confirmPassword: z.string().min(5).max(255),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export type TSignupForm = z.infer<typeof signupSchema>;
