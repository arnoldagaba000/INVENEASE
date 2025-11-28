import dotenv from "dotenv";
import z from "zod";

dotenv.config({ path: "../../../apps/server/.env" });

const envSchema = z.object({
    DATABASE_URL: z.url().describe("PostgreSQL connection string"),
    BETTER_AUTH_SECRET: z
        .string()
        .min(32)
        .describe("Authentication secret key"),
    BETTER_AUTH_URL: z.url().describe("Authentication base URL"),
    CORS_ORIGIN: z.string().describe("Allowed CORS origins"),
    NODE_ENV: z
        .enum(["development", "production", "test"])
        .default("development"),
    GOOGLE_CLIENT_ID: z.string().optional().describe("Google OAuth Client ID"),
    GOOGLE_CLIENT_SECRET: z
        .string()
        .optional()
        .describe("Google OAuth Client Secret"),
});

const parseEnv = () => {
    const result = envSchema.safeParse(process.env);
    if (!result.success) {
        console.error("❌ Invalid environment variables:");
        console.error(JSON.stringify(result.error.format(), null, 2));
        throw new Error("Environment validation failed");
    }

    return result.data;
};

export const env = parseEnv();
export type Env = z.infer<typeof envSchema>;
