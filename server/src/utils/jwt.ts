import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "eventforms-dev-secret-key-2024";
const JWT_EXPIRES_IN = "7d";

type TokenPayload = {
  userId: string;
  email: string;
};

export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
}