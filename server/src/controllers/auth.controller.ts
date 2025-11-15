import { Request, Response, NextFunction } from "express";
import * as authService from "../services/auth.service";
import { sendSuccess } from "../utils/apiResponse";

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, password } = req.body;
    const user = await authService.registerUser(name, email, password);
    return sendSuccess(res, 201, { user });
  } catch (err) {
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = await authService.loginUser(email, password);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/"
    });

    return sendSuccess(res, 200, { user, accessToken });
  } catch (err) {
    next(err);
  }
}

export async function refreshToken(req: Request, res: Response, next: NextFunction) {
  try {
    const cookie = req.cookies.refreshToken;
    if (!cookie) return res.status(401).json({ error: "No refresh token" });

    const accessToken = await authService.refreshAccess(cookie);

    return sendSuccess(res, 200, { accessToken });
  } catch (err) {
    next(err);
  }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    res.clearCookie("refreshToken", { path: "/" });
    return sendSuccess(res, 200, { message: "Logged out" });
  } catch (err) {
    next(err);
  }
}
