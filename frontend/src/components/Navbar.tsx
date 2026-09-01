import "./nav.css"
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>
);

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = (
    <>
      <a className="links" href="https://github.com/adarshraj077/collabCode" >Github</a>
      {token ? (
        <a className="links" onClick={()=>{navigate("/dashboard"); setIsMenuOpen(false);}} style={{cursor: "pointer"}}>Dashboard</a>
      ) : (
        <>
          <a className="links" onClick={()=>{navigate("/register"); setIsMenuOpen(false);}} style={{cursor: "pointer"}} >Sign up</a>
          <a className="links" onClick={()=>{navigate("/login"); setIsMenuOpen(false);}} style={{cursor: "pointer"}}>Login</a>
        </>
      )}
    </>
  );

  return (
    <>
    <div style={{ position: "sticky", top: 0, zIndex: 50, backgroundColor: "#191b20", display: "flex", flexDirection: "column", minHeight: "6vh", color: "#9c9ea2", fontFamily: "monospace", fontWeight: "lighter", fontSize: "clamp(14px, 2vw, 16px)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 4vw", width: "100%", boxSizing: "border-box" }}>
        <div style={{ fontWeight: "bold", fontSize: "clamp(16px, 2.5vw, 20px)", cursor: "pointer" }} onClick={()=>{navigate("/")}} >CollabCode</div>
        
        {/* Desktop Menu */}
        <div className="nav-desktop-menu">
          {navLinks}
        </div>

        {/* Mobile Hamburger Button */}
        <button className="nav-mobile-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <XIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`nav-mobile-menu ${isMenuOpen ? "open" : ""}`} style={{ paddingLeft: "4vw", paddingRight: "4vw" }}>
        {navLinks}
      </div>
    </div>
    </>
  )
}

export default Navbar