import jwt from "jsonwebtoken";

export function verifyJWT(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return decoded;
  } catch (err) {
    console.error("JWT verification error:", err);
    return null;
  }
}