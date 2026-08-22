import jwt from "jsonwebtoken";

export function verifyJWT(token: string) {
  if (!token) return null;
  try {
    // Verify your secret is actually loaded
// console.log("JWT_SECRET loaded:", Boolean(process.env.JWT_SECRET));
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string,{algorithms: ['HS256']});
    return decoded;
  } catch (err) {
    console.error("JWT verification error:", (err as Error).message);
    return null;
  }
}