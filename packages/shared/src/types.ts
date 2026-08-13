
export interface Runresult{
    stdout:string,
    stderr:string,
    exitcode:number | null,
    timeout:boolean
    executionTimeMs:number
}

export interface Room {
  id: string;
  code: string;
  language: string;
  users: Set<string>;
}

export const rooms = new Map<string, Room>();
export const runningRooms = new Set<string>();
