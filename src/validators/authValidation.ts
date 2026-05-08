import { z } from "zod";

export const registerValidation = z.object({
    name: z.string().min(2, "Name is required with more than 2 characters!").max(100),
    email: z.string().email("Invalid email address!"),
    password: z.string().min(6, "Password must be at least 6 characters long!").max(100)
});

export const loginValidation = z.object({ 
    email: z.string().email("Invalid email address!"),
    password: z.string().min(6, "Password is required with more than 6 characters!")
});