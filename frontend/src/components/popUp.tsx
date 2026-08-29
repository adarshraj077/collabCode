import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./popUp.css";

interface PopUpProps {
  isShow?: boolean;
}

function PopUp({ isShow = false }: PopUpProps) {
  const [showModal, setShowModal] = useState(isShow);
      const [roomId, setRoomId] = useState("");
      const navigate=useNavigate();

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

      

   const joinRoom = () => {
         if (!isTokenValid()) {
             navigate("/login");
             return;
         }
         if (roomId.trim()) navigate(`/room/${roomId}`);
    }

  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal " >
        <button className="close-btn" onClick={() => setShowModal(false)} style={{position:"absolute",top:"1vh",right:"1vh",background:"transparent",border:"none",fontSize:"1.5rem",cursor:"pointer"}}>
          ×
        </button>

        {/* <h2 style={{margin:"0",padding:"0",alignContent:"center"}}>Enter room id</h2> */}

        <div style={{display:"flex",alignItems:"space-between",justifyContent:"space-between",marginTop:"5vh",flexDirection:"column",gap:"2vh"}}>
          <input
        placeholder="Enter Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        // style={{marginBottom:"1vh",padding:"0.5vh",borderRadius:"5px",border:"1px solid #ccc",width:"80%"}}
        style={{
        background: "transparent",
        border: "none",
        borderBottom: "2px solid #45474a",
        outline: "none",
        color: "#ffffff",
        fontSize: "1rem",
        padding: "8px 0",
        fontFamily: "monospace",
        width: "100%",
        transition: "border-color 0.2s ease"
      }}
        />

        <button className="join-room-btn" style={{marginLeft:"0"}} onClick={joinRoom}>Join </button>


        
        </div>


      </div>
    </div>
  );
}

export default PopUp;