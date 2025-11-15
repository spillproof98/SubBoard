import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { env } from "./config/env";

import authRoutes from "./routes/auth.routes";
import plansRoutes from "./routes/plans.routes";
import subscriptionRoutes from "./routes/subscription.routes";
import adminRoutes from "./routes/admin.routes";

import { errorHandler } from "./middlewares/error.middleware";

export const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://subsboard.netlify.app"
  ],
  credentials: true
}));


app.get("/", (req, res) => res.send("SubBoard API is running"));

app.use("/api/auth", authRoutes);
app.use("/api/plans", plansRoutes);
app.use("/api/subscription", subscriptionRoutes);
app.use("/api/admin", adminRoutes);

app.use(errorHandler);
