import { z } from "zod";

export const createPlanSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  price: z.number(),
  durationDays: z.number(),
  billingCycle: z.string(),
  features: z.array(z.string())
});
