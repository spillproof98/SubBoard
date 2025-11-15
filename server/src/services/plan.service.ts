import prisma from "../config/db";

type PlanModel = {
  id: number;
  name: string;
  slug: string;
  price: number;
  durationDays: number;
  billingCycle: string;
  features: string;
  createdAt: Date;
};

export async function listPlans() {
  const plans = await prisma.plan.findMany({
    orderBy: { price: "asc" }
  });

  return plans.map((plan: PlanModel) => {
    return {
      ...plan,
      features: JSON.parse(plan.features) as string[]
    };
  });
}
