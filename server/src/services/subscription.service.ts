import prisma from "../config/db";
import { addDays } from "../utils/date";
import { NotFoundError } from "../utils/errors";

type DBUser = NonNullable<Awaited<ReturnType<typeof prisma.user.findFirst>>>;
type DBPlan = NonNullable<Awaited<ReturnType<typeof prisma.plan.findFirst>>>;
type DBSubscription = NonNullable<
  Awaited<ReturnType<typeof prisma.subscription.findFirst>>
>;

export type SubscriptionWithRelations = DBSubscription & {
  user: DBUser;
  plan: DBPlan & { features: string[] };
};

function parseFeatures(features: string): string[] {
  try {
    return JSON.parse(features);
  } catch {
    return [];
  }
}

// ----------------------
// CREATE SUBSCRIPTION
// ----------------------
export async function subscribeUserToPlan(
  userId: number,
  planId: number
): Promise<SubscriptionWithRelations> {
  const plan = await prisma.plan.findUnique({ where: { id: planId } });
  if (!plan) throw new NotFoundError("Plan not found");

  const start = new Date();
  const end = addDays(start, plan.durationDays);

  const sub = await prisma.subscription.create({
    data: {
      userId,
      planId,
      startDate: start,
      endDate: end,
      status: "active",
    },
    include: { user: true, plan: true },
  });

  return {
    ...sub,
    plan: {
      ...sub.plan!,
      features: parseFeatures(sub.plan!.features),
    },
    user: sub.user!,
  };
}

export async function getUserSubscriptions(
  userId: number
): Promise<SubscriptionWithRelations[]> {
  const subs = await prisma.subscription.findMany({
    where: { userId },
    include: { user: true, plan: true },
    orderBy: { startDate: "desc" },
  });

  return subs.map((sub) => ({
    ...sub,
    plan: {
      ...sub.plan!,
      features: parseFeatures(sub.plan!.features),
    },
    user: sub.user!,
  }));
}

export async function listAllSubscriptions(): Promise<
  SubscriptionWithRelations[]
> {
  const subs = await prisma.subscription.findMany({
    include: { user: true, plan: true },
    orderBy: { startDate: "desc" },
  });

  return subs.map((s) => ({
    ...s,
    plan: {
      ...s.plan!,
      features: parseFeatures(s.plan!.features),
    },
    user: s.user!,
  }));
}

export async function unsubscribeUser(
  subId: number,
  userId: number
): Promise<DBSubscription> {
  const sub = await prisma.subscription.findFirst({
    where: { id: subId, userId },
  });

  if (!sub) throw new NotFoundError("Subscription not found");

  return prisma.subscription.update({
    where: { id: subId },
    data: { status: "cancelled" },
  });
}

export async function getActiveSubscription(userId: number) {
  const now = new Date();

  const sub = await prisma.subscription.findFirst({
    where: {
      userId,
      endDate: { gte: now },
      status: "active",
    },
    include: { user: true, plan: true },
  });

  if (!sub) return null;

  return {
    ...sub,
    plan: {
      ...sub.plan!,
      features: parseFeatures(sub.plan!.features),
    },
    user: sub.user!,
  };
}
