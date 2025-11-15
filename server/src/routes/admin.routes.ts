import { Router } from "express";
import { authMiddleware, adminMiddleware } from "../middlewares/auth.middleware";
import { getAllSubscriptions } from "../controllers/subscription.controller";

const router = Router();

router.get("/subscriptions", authMiddleware, adminMiddleware, getAllSubscriptions);

export default router;
