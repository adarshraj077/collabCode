import jwt from "jsonwebtoken";
import { env } from "../config/env";

export function verifyJWT(token: string) {
  if (!token) return null;
  try {

    const decoded = jwt.verify(token, env.JWT_SECRET,{algorithms: ['HS256']});
    return decoded;
  } catch (err) {
    console.error("JWT verification error:", (err as Error).message);
    return null;
  }
}