import { Router } from "express";
import { register,login } from "../controllers/auth";
import { limiterFORauth } from "../middleware/rateLimiter";

const authRouter = Router()

authRouter.post("/register",limiterFORauth, register)
authRouter.post("/login",limiterFORauth,login)


export default authRouter
