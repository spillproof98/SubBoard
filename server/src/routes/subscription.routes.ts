import { Router } from "express";
import {
  subscribe,
  myActiveSubscription,
  mySubscriptions,
  getAllSubscriptions,
  unsubscribe as unsubscribeController,
} from "../controllers/subscription.controller";

import {
  authMiddleware,
  adminMiddleware,
} from "../middlewares/auth.middleware";

const router = Router();

router.post("/subscribe/:planId", authMiddleware, subscribe);

router.get("/me", authMiddleware, myActiveSubscription);

router.get("/my", authMiddleware, mySubscriptions);

router.get("/all", authMiddleware, adminMiddleware, getAllSubscriptions);

router.delete("/unsubscribe/:id", authMiddleware, unsubscribeController);

export default router;
