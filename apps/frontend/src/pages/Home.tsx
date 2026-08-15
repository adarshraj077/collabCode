import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


export default function Home() {
    const [roomId, setRoomId] = useState("");
    const navigate=useNavigate();

    const createRoom = async()=>{
         try{
            const res=await axios.post("http://localhost:3000/api/rooms");
            const nextRoomId = res.data.id;

            if (!nextRoomId) {
                console.error("No room id returned from server", res.data);
                return;
            }

            localStorage.setItem("roomId", nextRoomId);
            console.log(nextRoomId);
            navigate(`/room/${nextRoomId}`);
         }catch(err){
            console.log(err);
         }
    }

    const joinRoom = ()=>{
         if (roomId.trim()) navigate(`/room/${roomId}`);
    }

  return (
    <>
    <div>
        <button onClick={createRoom}>Create Room</button>
        <hr />
         <input
        placeholder="Enter Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
       <button onClick={joinRoom}>Join Room</button>
    </div>
    
    </>
  )
}

