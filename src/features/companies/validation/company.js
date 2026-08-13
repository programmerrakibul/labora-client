import z from "zod";

export const companySchema = z.object({
  name: z.string().trim().min(1, "Company name is required").max(150),

  email: z
    .string()
    .trim()
    .email("Enter a valid company email")
    .min(1, "Email is required")
    .transform((email) => email.toLowerCase()),

  website: z
    .string()
    .trim()
    .url("Enter a valid URL")
    .optional()
    .or(z.literal("")),

  industry: z.string().trim().optional(),

  about: z.string().trim().max(2000).optional(),

  location: z
    .object({
      city: z.string().trim().optional(),
      state: z.string().trim().optional(),
      country: z.string().trim().optional(),
    })
    .optional(),

  logo: z.string().trim().optional(),
});
