import express from "express";
import { getRoomsForUser, getRoom } from "../service/redis/room";
import { authenticate } from "../middleware/authorization";
import { limiter } from "../middleware/rateLimiter";

const userRouter = express.Router();

userRouter.get("/dashboard", limiter, authenticate, async (req, res) => {
  const userId = (req as any).user;

  try {
    const roomsIds = await getRoomsForUser(userId);
    const rooms = await Promise.all(
      roomsIds.map(async (id) => await getRoom(id)),
    );
    res.json({ success: true, data: rooms.filter(Boolean) });
  } catch (error) {
    res
      .status(500)
      .json({ success: false ,message: "Error fetching dashboard data" });
  }
});

export default userRouter;
