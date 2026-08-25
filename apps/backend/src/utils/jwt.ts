import jwt from "jsonwebtoken";

export function verifyJWT(token: string) {
  if (!token) return null;
  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string,{algorithms: ['HS256']});
    return decoded;
  } catch (err) {
    console.error("JWT verification error:", (err as Error).message);
    return null;
  }
}