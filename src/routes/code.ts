import { Router } from "express";
import handelrunCode from "../controllers/handelCoderun";
const codeRouter = Router();



codeRouter.post("/api/run",handelrunCode)

export default codeRouter