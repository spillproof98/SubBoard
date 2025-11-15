import api from "./api";

export async function subscribeToPlan(planId: number) {
  return (await api.post(`/subscription/subscribe/${planId}`)).data;
}

export async function getActiveSubscription() {
  return (await api.get("/subscription/me")).data.subscription;
}

export async function getMySubscriptions() {
  return (await api.get("/subscription/my")).data.subscriptions;
}

export async function adminGetSubscriptions() {
  return (await api.get("/subscription/all")).data.subscriptions;
}

export async function unsubscribe(id: number) {
  return (await api.delete(`/subscription/unsubscribe/${id}`)).data;
}
