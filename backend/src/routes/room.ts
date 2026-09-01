import { Router } from "express";
import type { Request, Response} from "express"
import type {Room} from "../shared/types";
import generateRandomString from "../utils/generateRoomId";
import {getRoom,setRoom, getUsersInRoom} from "../service/redis/room";
import { limiter } from "../middleware/rateLimiter";

const roomRouter = Router();

roomRouter.post("/",limiter ,async (req: Request,res: Response)=>{
    const roomId = generateRandomString();
    const rawLanguage = req.body?.language ?? "javascript";
    const language = rawLanguage === "js" ? "javascript" : rawLanguage === "ts" ? "typescript" : rawLanguage;
    const room:Room = {
        id:roomId,
        code:"", 
        language,
        createdAt: new Date().toISOString()
    }

    await setRoom(roomId,room)

    return res.json(room)
})


roomRouter.get("/rooms/:roomId",limiter ,async (req: Request, res: Response) => {
    const roomId = req.params.roomId as string;
    const room = await getRoom(roomId);
    if (room) {
        const users = await getUsersInRoom(roomId);
        res.json({ ...room, users });  
    } else {
        res.status(404).json({ error: "Room not found" });
    }
});


export default roomRouter;