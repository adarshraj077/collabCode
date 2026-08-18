import redis from "../../config/redis";
import type { Room } from "@collabcode/shared";

export async function getRoom(roomId:string):Promise<Room | null> {
   const roomData= await redis.get(`room:${roomId}`);
    if(!roomData){return null}
    return JSON.parse(roomData) as Room;
}

export async function setRoom(roomId:string,room:Room):Promise<void> {
   await redis.set(`room:${roomId}`,JSON.stringify(room),"EX",60*60*24);
}

export async function addUserToRoom(roomId:string,socketId:string):Promise<void> {
   await redis.sadd(`room:${roomId}:users`, socketId);
}

export async function removeUserFromRoom(roomId:string,socketId:string):Promise<void> {
   await redis.srem(`room:${roomId}:users`, socketId);
}

export async function getNoOfUsers(roomId:string):Promise<Number> {
    return await redis.scard(`room:${roomId}:users`);
}

export async function ADDrunningRooms(roomId:string):Promise<void> {
    await redis.set(`running:${roomId}`, "true", "EX", 60 * 60 * 24);
}

export async function isRoomRunning(roomId:string):Promise<boolean> {
    const isRunning = await redis.get(`running:${roomId}`);
    return isRunning === "true";
}

export async function deleteFromRunningRooms(roomId:string):Promise<void> {
      await redis.del(`running:${roomId}`);
}

export async function getUsersInRoom(
  roomId: string
): Promise<string[]> {
  return await redis.smembers(`room:${roomId}:users`);
}

export async function hasUserInRoom(roomId: string, socketId: string): Promise<boolean> {
  const isMember = await redis.sismember(`room:${roomId}:users`, socketId);
  return isMember === 1;
}

const roomLocks = new Map<string, Promise<void>>();

export async function updateRoom(roomId: string, updateFn: (room: Room) => void): Promise<Room | null> {
    const currentLock = roomLocks.get(roomId) || Promise.resolve();
    let updatedRoom: Room | null = null;
    const nextLock = currentLock.then(async () => {
        const room = await getRoom(roomId);
        if (room) {
            updateFn(room);
            await setRoom(roomId, room);
            updatedRoom = room;
        }
    }).catch((err) => {
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
