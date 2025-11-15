import dotenv from "dotenv";
dotenv.config();

export const env = {
  PORT: Number(process.env.PORT),
  FRONTEND_URL: process.env.FRONTEND_URL || "",

  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "",
  ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY || "15m",
  REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY || "30d",

  COOKIE_SECURE: process.env.COOKIE_SECURE === "true",
  BRAND_NAME: process.env.BRAND_NAME || "Quarterly"
};
