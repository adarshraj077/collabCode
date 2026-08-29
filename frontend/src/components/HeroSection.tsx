import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PopUp from "./popUp";
import { BACKEND_URL } from "../config";
import heroImage from "../public/image.png";

import "./hero.css";


const HeroSection = () => {


    // const [isPopUpOpen, setIsPopUpOpen] = useState(false);
    const [popUpKey, setPopUpKey] = useState(0);
    const navigate = useNavigate();

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
        } catch (err) {
            console.log(err);
        }
    }



    return (

        <>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", flex: 1, width: "100%", scrollbarWidth:"none", msOverflowStyle: "none" , overflow: "auto" }} className="hero">
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", color: "#c5c6c7", paddingTop: "10vh", paddingBottom: "5vh", position: "relative", zIndex: 10, paddingLeft: "20px", paddingRight: "20px" }}>

                    <h1 style={{ fontSize: "clamp(28px, 5vw, 40px)", padding: "0", margin: "0", fontFamily: "monospace", fontWeight: "lighter" }}>Share Code in Real-time with Developers </h1>
                    <h2 style={{ fontSize: "clamp(14px, 2.5vw, 18px)", padding: "0", marginTop: "3vh", fontFamily: "monospace", fontWeight: "lighter", color: "#9fa0a0", maxWidth: "800px" }}>An online code editor for interviews, troubleshooting, teaching & more…</h2>

                    <div style={{ display: "flex", gap: "20px", marginTop: "4vh", flexWrap: "wrap", justifyContent: "center" }}>
                        <button className="create-room-btn" onClick={createRoom} >Create Room</button>
                        <button className="join-room-btn" onClick={() => { setPopUpKey(prev => prev + 1) }}>Join Room</button>
                    </div>

                </div>
                <div style={{ position: "relative", width: "100%", display: "flex", justifyContent: "center", marginTop: "2vh" }}>
                    <img src={heroImage} alt="hero" className="hero-image"></img>
                    <div style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        height: "50%",
                        background: "linear-gradient(to bottom, transparent, #191b20 95%)",
                        pointerEvents: "none"
                    }}></div>
                </div>
            </div>



            {popUpKey > 0 && <PopUp key={popUpKey} isShow={true} />}
        </>
    )
}

export default HeroSection