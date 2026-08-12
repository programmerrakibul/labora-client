import z from "zod";

export const jobSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  description: z.string().min(1, "Description is required"),
  jobType: z.string().min(1, "Job type is required"),
  workLocationType: z.string().min(1, "Work location type is required"),
  experienceLevel: z.string().min(1, "Experience level is required"),
  category: z.string().min(1, "Category is required"),
  salaryMin: z.coerce.number().min(0).optional(),
  salaryMax: z.coerce.number().min(0).optional(),
  salaryCurrency: z.string().default("BDT"),
  isNegotiable: z.boolean().default(false),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  status: z.string().default("ACTIVE"),
  expiresAt: z.date().optional(),
});
