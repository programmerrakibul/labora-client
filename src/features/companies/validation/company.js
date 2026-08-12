import z from "zod";

export const companySchema = z.object({
  name: z.string().min(1, "Company name is required").max(150),
  website: z.string().url("Enter a valid URL").optional().or(z.literal("")),
  industry: z.string().optional(),
  about: z.string().max(2000).optional(),
  location: z
    .object({
      city: z.string().optional(),
      state: z.string().optional(),
      country: z.string().optional(),
    })
    .optional(),
  logo: z.string().optional(),
});
