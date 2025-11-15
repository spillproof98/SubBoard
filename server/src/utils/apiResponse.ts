import { Response } from "express";

export function sendSuccess(res: Response, status: number, payload: object) {
  return res.status(status).json({ success: true, ...payload });
}
