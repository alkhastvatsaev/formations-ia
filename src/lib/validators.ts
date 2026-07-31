import { z } from "zod";

export const apiErrorSchema = z.object({
  error: z.object({
    code: z.string(),
    message: z.string(),
  }),
});

export type ApiError = z.infer<typeof apiErrorSchema>;

export function apiError(
  code: string,
  message: string,
  status = 400,
): Response {
  return Response.json({ error: { code, message } } satisfies ApiError, {
    status,
  });
}

export function apiSuccess<T extends Record<string, unknown>>(
  data: T,
  status = 200,
): Response {
  return Response.json(data, { status });
}

export const newsletterSchema = z.object({
  email: z.string().email("Email invalide"),
  website: z.string().max(0).optional(), // honeypot
});

export const contactSchema = z.object({
  name: z.string().min(2, "Nom trop court").max(120),
  email: z.string().email("Email invalide"),
  company: z.string().max(120).optional(),
  message: z.string().min(20, "Message trop court").max(4000),
  website: z.string().max(0).optional(),
});

export const checkoutSchema = z.object({
  formationSlug: z.string().min(1),
  email: z.string().email().optional(),
  website: z.string().max(0).optional(),
});
