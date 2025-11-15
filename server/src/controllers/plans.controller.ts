import { Request, Response, NextFunction } from "express";
import * as planService from "../services/plan.service";
import { sendSuccess } from "../utils/apiResponse";

export async function getPlans(req: Request, res: Response, next: NextFunction) {
  try {
    const plans = await planService.listPlans();
    return sendSuccess(res, 200, { plans });
  } catch (err) {
    next(err);
  }
}
