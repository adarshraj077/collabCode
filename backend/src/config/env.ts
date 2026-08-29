import { z } from "zod";

const envSchema = z.object({
  PORT: z.string().default("3000"),
  MONGODB_URI: z.string(),
  REDIS_URL: z.string(),
  JWT_SECRET: z.string(),
  FRONTEND_URL: z.string().optional(),
});

export const env = envSchema.parse(process.env);
