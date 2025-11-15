import { RequestWithUser } from "../types/RequestWithUser";
import { Response, NextFunction } from "express";

export function requireRole(role: "admin" | "user") {
  return (req: RequestWithUser, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    if (req.user.role !== role) return res.status(403).json({ error: "Forbidden" });
    next();
  };
}
