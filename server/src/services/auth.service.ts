import prisma from "../config/db";
import bcrypt from "bcryptjs";


import { SignPayload, signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/jwt";
import { UnauthorizedError, BadRequestError } from "../utils/errors";

export async function registerUser(name: string, email: string, password: string) {
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) throw new BadRequestError("Email already registered");

  const hash = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: { name, email, password: hash }
  });
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new UnauthorizedError("Invalid credentials");

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) throw new UnauthorizedError("Invalid credentials");

  const payload: SignPayload = {
    id: user.id,
    email: user.email,
    role: user.role
  };

  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  return { user, accessToken, refreshToken };
}

export async function refreshAccess(refreshToken: string) {
  const payload = verifyRefreshToken(refreshToken);

  const accessToken = signAccessToken({
    id: payload.id,
    email: payload.email,
    role: payload.role
  });

  return accessToken;
}
