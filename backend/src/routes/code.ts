import { Router } from "express";
import handelrunCode from "../controllers/handelCoderun";
import { limiter } from "../middleware/rateLimiter";

const codeRouter = Router();

codeRouter.post("/run", limiter, handelrunCode)

export default codeRouter