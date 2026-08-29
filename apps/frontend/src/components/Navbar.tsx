import "./nav.css"
import { useNavigate } from "react-router-dom";

// import darkModeIcon from "../public/dark_mode_28dp__FILL0_wght400_GRAD0_opsz24.png";
// import lightModeIcon from "../public/light_mode_28dp_667082_FILL0_wght400_GRAD0_opsz24.png";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <>
    <div style={{ position: "sticky", top: 0, zIndex: 50, backgroundColor: "#191b20", display: "flex", justifyContent: "space-between", alignItems: "center", minHeight: "6vh", padding: "1px  4vw", color: "#9c9ea2", fontFamily: "monospace", fontWeight: "lighter", fontSize: "clamp(14px, 2vw, 16px)", flexWrap: "wrap", gap: "10px" }}>
      <div style={{ fontWeight: "bold", fontSize: "clamp(16px, 2.5vw, 20px)", cursor: "pointer" }} onClick={()=>{navigate("/")}} >CollabCode</div>
      <div style={{display: "flex", gap: "clamp(10px, 3vw, 2rem)", color: "#667082", alignItems: "center"}}>
        <a className="links" href="https://github.com/adarshraj077/collabCode" >Github</a>
        {token ? (
          <a className="links" onClick={()=>{navigate("/dashboard")}} style={{cursor: "pointer"}}>Dashboard</a>
        ) : (
          <>
            <a className="links" onClick={()=>{navigate("/register")}} style={{cursor: "pointer"}} >Sign up</a>
            <a className="links" onClick={()=>{navigate("/login")}} style={{cursor: "pointer"}}>Login</a>
          </>
        )}
      </div>
    </div>
    
    </>
  )
}

export default Navbar