import { Request, Response, NextFunction } from "express";

export function errorHandler(err: any, _: Request, res: Response, __: NextFunction) {
  console.error(err);
  return res.status(err.status || 500).json({
    error: err.message || "Internal Server Error"
  });
}
