export type Plan = {
  id: number;
  name: string;
  slug: string;
  price: number;
  durationDays: number;
  billingCycle: string;
  features: string[];
};
