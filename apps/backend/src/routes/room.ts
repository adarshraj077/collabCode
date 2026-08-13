import { Router } from "express";
import type {Room} from "@collabcode/shared";
import { rooms } from "@collabcode/shared";
import crypto from "crypto";

const roomRouter = Router();

roomRouter.post("/",(req,res)=>{
    const roomId = crypto.randomUUID().substring(2,15);
    let { language } = req.body;
    if (!language) {
           language = "js";
    }
    const room:Room = {
        id:roomId,
        code:"", 
        language:language,
        users:new Set()  
    }
    rooms.set(roomId,room)

    return res.json(room)
})


roomRouter.get("/rooms/:roomId", (req, res) => {
    const roomId = req.params.roomId;
    const room = rooms.get(roomId);
    if (room) {
        res.json({ ...room, users: [...room.users] });  
    } else {
        res.status(404).json({ error: "Room not found" });
    }
});


export default roomRouter;