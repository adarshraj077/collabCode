import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


export default function Home() {
    const [roomId, setRoomId] = useState("");
    const navigate=useNavigate();
    console.log(import.meta.env.VITE_BACKEND_URL);

    const isTokenValid = () => {
         const token = localStorage.getItem("token");
         if (!token) return false;
         try {
             const payload = JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
             if (payload.exp && payload.exp * 1000 < Date.now()) {
                 localStorage.removeItem("token"); // clean up expired token
                 return false;
             }
             return true;
         } catch (e) {
             return false;
         }
    };

    const createRoom = async () => {
         if (!isTokenValid()) {
             navigate("/login");
             return;
         }

         const token = localStorage.getItem("token");
         try {
            const BACKEND_URL = import.meta.env.VITE_BACKEND_URL.replace("localhost", window.location.hostname);
            const res = await axios.post(BACKEND_URL + "/rooms", {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const nextRoomId = res.data.id;

            if (!nextRoomId) {
                console.error("No room id returned from server", res.data);
                return;
            }

            localStorage.setItem("roomId", nextRoomId);
            console.log(nextRoomId);
            navigate(`/room/${nextRoomId}`);
         } catch(err) {
            console.log(err);
         }
    }

    const joinRoom = () => {
         if (!isTokenValid()) {
             navigate("/login");
             return;
         }
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

