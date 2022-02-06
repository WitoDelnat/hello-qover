import configFiles from "config";
import { z } from "zod";

const configSchema = z.object({
  server: z.object({
    port: z.number().min(0).max(65535),
  }),
  logger: z.object({
    level: z.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"]),
    json: z.boolean(),
  }),
  database: z.object({
    protocol: z.literal("mongodb").or(z.literal("mongodb+srv")),
    username: z.string(),
    password: z.string(),
    host: z.string(),
    port: z.number().min(0).max(65535),
    database: z.string(),
  }),
  auth: z.object({
    domain: z.string(),
    audience: z.string(),
    expiresAfterSeconds: z.number(),
    jwtSecret: z.string(),
  }),
});

export type Config = z.infer<typeof configSchema>;
export const config = configSchema.parse(configFiles.util.toObject());
