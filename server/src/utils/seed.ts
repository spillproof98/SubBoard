import prisma from "../config/db";
import bcrypt from "bcryptjs";

async function main() {
  console.log("Resetting database...");

  await prisma.subscription.deleteMany();

  await prisma.plan.deleteMany();

  await prisma.user.deleteMany({
    where: { email: { not: "admin@quarterly.com" } }
  });

  console.log("Seeding database...");

  const plans = [
  {
    name: "Quarterly Starter",
    slug: "quarterly-starter",
    price: 12.99,
    durationDays: 90,
    billingCycle: "quarterly",
    features: JSON.stringify(["Basic analytics", "1 device", "Email support"]),
  },
  {
    name: "Quarterly Pro",
    slug: "quarterly-pro",
    price: 34.99,
    durationDays: 90,
    billingCycle: "quarterly",
    features: JSON.stringify(["Advanced analytics", "5 devices", "Priority support"]),
  },
  {
    name: "Quarterly Business",
    slug: "quarterly-business",
    price: 59.99,
    durationDays: 90,
    billingCycle: "quarterly",
    features: JSON.stringify([
      "Team analytics",
      "10 devices",
      "Team management",
      "Priority email support",
    ]),
  },
  {
    name: "Enterprise Unlimited",
    slug: "enterprise-unlimited",
    price: 249.99,
    durationDays: 90,
    billingCycle: "quarterly",
    features: JSON.stringify([
      "All features unlocked",
      "Unlimited devices",
      "Dedicated account manager",
      "24/7 priority support",
    ]),
  },
];


  // Reinsert fresh plans
  for (const p of plans) {
    await prisma.plan.create({ data: p });
  }

  // Ensure admin exists
  await prisma.user.upsert({
    where: { email: "admin@quarterly.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@quarterly.com",
      password: await bcrypt.hash("AdminPass123", 10),
      role: "admin",
    },
  });

  console.log("Seeding completed.");
}

main()
  .finally(() => prisma.$disconnect());
