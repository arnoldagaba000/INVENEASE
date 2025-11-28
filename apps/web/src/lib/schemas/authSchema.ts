import z from "zod";

const emailSchema = z.email("Provide a valid email address");
const passwordSchema = z
    .string()
    .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
    );

export const loginSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
    rememberMe: z.boolean(),
});
export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: emailSchema,
    password: passwordSchema,
});
export type RegisterInput = z.infer<typeof registerSchema>;