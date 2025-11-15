import api from "./api";

export async function getPlans() {
  const res = await api.get("/plans");
  return res.data.plans;
}

export async function subscribeToPlan(planId: number) {
  const res = await api.post(`/subscription/subscribe/${planId}`);
  return res.data;
}
