import { Server } from "socket.io";
import runCode from "../utils/runCode";
import type { Server as HttpServer } from "node:http";
import { rooms, runningRooms } from "@collabcode/shared";

export default function setupSocket(httpServer: HttpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    console.log("client connected:", socket.id);

    socket.on("run-code", async ({ roomId }) => {
      if (runningRooms.has(roomId)) {
        socket.emit("code-result", { error: "Already running" });
        return;
      }

      runningRooms.add(roomId);

      try {
        const room = rooms.get(roomId);
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
        runningRooms.delete(roomId);
      }
    });

    socket.on("code-change", ({ roomId, code }) => {
      try {
        const room = rooms.get(roomId);
        if (!room) {
          socket.emit("code-update", { error: "Room not found" });
          return;
        }

        room.code = code;
        socket.to(roomId).emit("code-update", { code });
      } catch (err) {
        socket.emit("code-update", {
          error: err instanceof Error ? err.message : String(err),
        });
      }
    });

    socket.on("language-change", ({ roomId, language }) => {
      try {
        const room = rooms.get(roomId);
        if (!room) {
          socket.emit("language-update", { error: "Room not found" });
          return;
        }

        room.language = language;
        socket.to(roomId).emit("language-update", { language });
      } catch (err) {
        socket.emit("language-update", {
          error: err instanceof Error ? err.message : String(err),
        });
      }
    });

    socket.on("join-room", (roomId: string) => {
      const room = rooms.get(roomId);
      if (!room) {
        socket.emit("error", { message: "Room not found" });
        return;
      }

      socket.data.roomId = roomId;
      room.users.add(socket.id);
      socket.join(roomId);

      // Send current state to the joining user
      socket.emit("room-state", { ...room, users: [...room.users] });

      // Notify everyone else in the room
      socket.to(roomId).emit("user-joined", {
        userId: socket.id,
        count: room.users.size,
      });
    });

    socket.on("disconnect", () => {
      console.log("client disconnected:", socket.id);

      rooms.forEach((room, roomId) => {
        if (room.users.has(socket.id)) {
          room.users.delete(socket.id);

          // Notify remaining users
          io.to(roomId).emit("user-left", {
            userId: socket.id,
            count: room.users.size,
          });

          // Keep room data alive across refreshes/reconnects.
          // If the room becomes empty, we do not delete it immediately.
          if (room.users.size === 0) {
            runningRooms.delete(roomId);
          }
        }
      });
    });
  });

  return io;
}