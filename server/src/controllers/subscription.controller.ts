import { Request, Response } from "express";
import {
  subscribeUserToPlan,
  getActiveSubscription,
  listAllSubscriptions,
  unsubscribeUser,
  getUserSubscriptions
} from "../services/subscription.service";

export const subscribe = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const planId = Number(req.params.planId);

  const sub = await subscribeUserToPlan(userId, planId);
  res.json({ subscription: sub });
};

export const myActiveSubscription = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const sub = await getActiveSubscription(userId);
  res.json({ subscription: sub });
};

export const mySubscriptions = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const subs = await getUserSubscriptions(userId);
  res.json({ subscriptions: subs });
};

export const getAllSubscriptions = async (req: Request, res: Response) => {
  const subs = await listAllSubscriptions();
  res.json({ subscriptions: subs });
};

export const unsubscribe = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const subId = Number(req.params.id);

  await unsubscribeUser(subId, userId);

  res.json({ message: "Unsubscribed successfully" });
};
