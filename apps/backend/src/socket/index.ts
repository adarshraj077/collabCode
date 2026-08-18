import { Server } from "socket.io";
import runCode from "../utils/runCode";
import type { Server as HttpServer } from "node:http";
import {
  getRoom,
  updateRoom,
  addUserToRoom,
  removeUserFromRoom,
  getNoOfUsers,
  ADDrunningRooms,
  isRoomRunning,
  deleteFromRunningRooms,
  getUsersInRoom,
  hasUserInRoom
} from "../service/redis/room";
export default function setupSocket(httpServer: HttpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    console.log("client connected:", socket.id);

    socket.on("run-code", async ({ roomId }) => {
      if (await isRoomRunning(roomId)) {
        socket.emit("code-result", { error: "Already running" });
        return;
      }

     await  ADDrunningRooms(roomId);

      try {
        const room = await getRoom(roomId);
        if (!room) {
          socket.emit("code-result", { error: "Room not found" });
          return;
        }

        const result = await runCode(room.code, room.language);
        io.to(roomId).emit("code-result", result);
      } catch (err) {
        io.to(roomId).emit("code-result", {
          error: err instanceof Error ? err.message : String(err),
        });
      } finally {
        await deleteFromRunningRooms(roomId);
      }
    });

    socket.on("code-change", async ({ roomId, code }) => {
      try {
        const room = await updateRoom(roomId, (r) => { r.code = code; });
        if (!room) {
          socket.emit("code-update", { error: "Room not found" });
          return;
        }

        socket.to(roomId).emit("code-update", { code });
      } catch (err) {
        socket.emit("code-update", {
          error: err instanceof Error ? err.message : String(err),
        });
      }
    });

    socket.on("language-change", async ({ roomId, language }) => {
      try {
        const room = await updateRoom(roomId, (r) => { r.language = language; });
        if (!room) {
          socket.emit("language-update", { error: "Room not found" });
          return;
        }

        socket.to(roomId).emit("language-update", { language });
      } catch (err) {
        socket.emit("language-update", {
          error: err instanceof Error ? err.message : String(err),
        });
      }
    });

    socket.on("join-room", async (roomId: string) => {
      const room = await getRoom(roomId);
      if (!room) {
        socket.emit("error", { message: "Room not found" });
        return;
      }

      socket.data.roomId = roomId;
      await addUserToRoom(roomId, socket.id);
      socket.join(roomId);

      const users = await getUsersInRoom(roomId);
      socket.emit("room-state", { ...room,  users });
    


io.to(roomId).emit("room-users", {
  count: await getNoOfUsers(roomId),
});

      // Notify everyone else in the room
      socket.to(roomId).emit("user-joined", {
        userId: socket.id,
        count: await getNoOfUsers(roomId),
      });
    });

    socket.on("disconnect", async () => {
      console.log("client disconnected:", socket.id);

      const roomId = socket.data.roomId;
      if (roomId) {
        const hasUser = await hasUserInRoom(roomId, socket.id);
        if (hasUser) {
          await removeUserFromRoom(roomId, socket.id);

          const count = await getNoOfUsers(roomId);

          // Notify remaining users
          io.to(roomId).emit("user-left", {
            userId: socket.id,
            count
          });

          io.to(roomId).emit("room-users", {
            count
          });
        }
      }
    });
  });

  return io;
}