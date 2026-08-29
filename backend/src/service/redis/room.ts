import redis from "../../config/redis";
import type { Room } from "../../shared/types";

export async function getRoom(roomId: string): Promise<Room | null> {
  const roomData = await redis.get(`room:${roomId}`);
  if (!roomData) {
    return null;
  }
  return JSON.parse(roomData) as Room;
}

export async function setRoom(roomId: string, room: Room): Promise<void> {
  await redis.set(`room:${roomId}`, JSON.stringify(room), "EX", 60 * 60 * 24);
}

export async function addUserToRoom(
  roomId: string,
  socketId: string,
   userId: string ,
  username: string,
  color: string,
): Promise<void> {
    const members = await redis.smembers(`room:${roomId}:users`);
    const existingMembers = members.filter((user) => JSON.parse(user).username === username);
    for (const member of existingMembers) {
      await redis.srem(`room:${roomId}:users`, member);
    }
    
    const user=JSON.stringify({ socketId, username, color });
  await redis.sadd(`room:${roomId}:users`, user);
 await redis.sadd(`user:${userId}:rooms`, roomId); 
  await redis.expire(`room:${roomId}:users`, 60 * 60 * 24); // 24 hours TTL
}

export async function getRoomsForUser(userId: string): Promise<string[]> {
    return await redis.smembers(`user:${userId}:rooms`);
}

export async function removeUserFromRoom(
  roomId: string,
  socketId: string,
): Promise<void> {
    const members=await redis.smembers(`room:${roomId}:users`);
    const member=members.find((user) => JSON.parse(user).socketId === socketId);
  if(member)await redis.srem(`room:${roomId}:users`, member);
}

export async function getNoOfUsers(roomId: string): Promise<Number> {
  return await redis.scard(`room:${roomId}:users`);
}

export async function ADDrunningRooms(roomId: string): Promise<void> {
  await redis.set(`running:${roomId}`, "true", "EX", 60 * 60 * 24);
}

export async function isRoomRunning(roomId: string): Promise<boolean> {
  const isRunning = await redis.get(`running:${roomId}`);
  return isRunning === "true";
}

export async function deleteFromRunningRooms(roomId: string): Promise<void> {
  await redis.del(`running:${roomId}`);
}

export async function getUsersInRoom(roomId: string): Promise<{socketId: string, username: string, color: string}[]> {
    const users = await redis.smembers(`room:${roomId}:users`);
    return users.map((user) => JSON.parse(user));
}

export async function hasUserInRoom(
  roomId: string,
  socketId: string,
): Promise<boolean> {
  const members = await redis.smembers(`room:${roomId}:users`);
  const member = members.find((user) => JSON.parse(user).socketId === socketId);
  return !!member;
}

const roomLocks = new Map<string, Promise<void>>();

export async function updateRoom(
  roomId: string,
  updateFn: (room: Room) => void,
): Promise<Room | null> {
  const currentLock = roomLocks.get(roomId) || Promise.resolve();
  let updatedRoom: Room | null = null;
  const nextLock = currentLock
    .then(async () => {
      const room = await getRoom(roomId);
      if (room) {
        updateFn(room);
        await setRoom(roomId, room);
        updatedRoom = room;
      }
    })
    .catch((err) => {
      console.error("Error updating room:", err);
    });
  roomLocks.set(roomId, nextLock);

  nextLock.finally(() => {
    if (roomLocks.get(roomId) === nextLock) {
      roomLocks.delete(roomId);
    }
  });

  await nextLock;
  return updatedRoom;
}
