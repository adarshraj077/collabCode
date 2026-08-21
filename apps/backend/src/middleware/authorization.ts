import type{ Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

function authenticate(req: Request, res: Response, next:NextFunction) {
   const token = req.cookies.token;
   if (!token) {
      res.status(401).json({ message: "Access denied. No token provided." });
      return;
    }
    const jwtSecret = process.env.JWT_SECRET;
    
    const decode= jwt.verify(token, jwtSecret as string) as { id: string };
    if (!decode) {
      res.status(401).json({ message: "Access denied. Invalid token." });
      return;
    }

    (req as any).user=decode.id;
    next();
}