import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  let token = req.cookies?.token;

  if (!token && req.headers.authorization) {
    const authHeader = req.headers.authorization;
    token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;
  }

  if (!token) {
    res.status(401).json({ message: "Access denied. No token provided." });
    return;
  }

  const jwtSecret = process.env.JWT_SECRET;

  try {
    const decode = jwt.verify(token, jwtSecret as string) as { id: string };
    if (!decode) {
      res.status(401).json({ message: "Access denied. Invalid token." });
      return;
    }

    (req as any).user = decode.id;
    next();
  } catch (err) {
    res.status(401).json({ message: "Access denied. Invalid or expired token." });
    return;
  }
}