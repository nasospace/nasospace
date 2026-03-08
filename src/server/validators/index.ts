/**
 * Shared Zod validation schemas for server-side validation.
 */

import { z } from "zod";

export const emailSchema = z.string().email("Invalid email address");

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(20),
});

export const slugSchema = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format");
