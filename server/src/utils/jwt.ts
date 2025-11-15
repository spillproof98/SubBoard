import jwt, { Secret } from "jsonwebtoken";
import { env } from "../config/env";

export type SignPayload = {
  id: number;
  email: string;
  role: string;
};

const ACCESS_SECRET: Secret = env.JWT_ACCESS_SECRET;
const REFRESH_SECRET: Secret = env.JWT_REFRESH_SECRET;

export function signAccessToken(payload: SignPayload): string {
  return jwt.sign(payload, ACCESS_SECRET, {
    expiresIn: env.ACCESS_TOKEN_EXPIRY
  });
}

export function signRefreshToken(payload: SignPayload): string {
  return jwt.sign(payload, REFRESH_SECRET, {
    expiresIn: env.REFRESH_TOKEN_EXPIRY
  });
}

export function verifyAccessToken(token: string): SignPayload {
  return jwt.verify(token, ACCESS_SECRET) as SignPayload;
}

export function verifyRefreshToken(token: string): SignPayload {
  return jwt.verify(token, REFRESH_SECRET) as SignPayload;
}
