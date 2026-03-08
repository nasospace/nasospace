import { z } from "zod";

/**
 * Type-safe environment variable parser.
 * Add variables here as the project grows.
 * Uses Vite's import.meta.env — will map to process.env after Next.js migration.
 */
const envSchema = z.object({
  MODE: z.string().default("development"),
  BASE_URL: z.string().default("/"),
  DEV: z.boolean().default(true),
  // Future: CMS_API_TOKEN, COMMERCE_STOREFRONT_TOKEN, etc.
});

export type Env = z.infer<typeof envSchema>;

function parseEnv(): Env {
  const raw = {
    MODE: import.meta.env.MODE,
    BASE_URL: import.meta.env.BASE_URL,
    DEV: import.meta.env.DEV,
  };
  return envSchema.parse(raw);
}

export const env = parseEnv();
