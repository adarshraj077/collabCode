import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ErrorPopUp from "../components/ErrorPopUp";
import EditorComp from "../components/Editor";
import { useRoomSocket } from "../utils/roomSocket";
import Console from "../components/Console";
import "./room.css";


const LANGUAGES = ["javascript", "typescript", "c", "cpp", "go"];

export default function Room() {
  const { roomId: routeRoomId } = useParams<{ roomId: string }>();
  const roomId = routeRoomId ?? localStorage.getItem("roomId") ?? "";
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const {
    code,
    language,
    output,
    users,
    usersCount,
    roomError,
    setOutput,
    handleLanguageChange,
    handleCodeChange,
    runCode
  } = useRoomSocket(roomId);

  function copyToClipboard() {
    navigator.clipboard.writeText(roomId)
      .then(() => {
        console.log('Text successfully copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  }


  function CopyLink() {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        console.log('Text successfully copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  }




  return (
    <>
      <ErrorPopUp isShow={!!roomError} errorMessage={roomError} />
      <div
        onKeyDownCapture={(e) => {
          if ((e.ctrlKey || e.metaKey) && e.key === "'") {
            e.preventDefault(); runCode();
          }
        }}
        style={{ display: "flex", flexDirection: "column", gap: 0, height: "100vh", overflow: "hidden" }}
      >

        <div className="room-nav">
          {/* Left: Home */}
          <div className="room-nav-left">
            <span
              onClick={() => navigate("/dashboard")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                color: "#eff1f6",
                fontWeight: "500",
                cursor: "pointer",
                padding: "6px 10px",
                borderRadius: "6px",
                transition: "background-color 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#282828")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <img src="/arrow_back.svg" style={{ height: "13px" }} alt="home" />home
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* Center: Language Select & Run */}
            <div className="room-nav-center">
              <div ref={dropdownRef} style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <div
                  className="room-nav-lang-select"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  style={{ display: "flex", alignItems: "center", padding: "0 10px", justifyContent: "space-between", width: "130px", userSelect: "none" }}
                >
                  <span>{language}</span>
                  <span style={{ fontSize: "9px", color: "#8a8a8a", transition: "transform 0.2s", transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
                </div>
                
                {isDropdownOpen && (
                  <div className="custom-dropdown-menu">
                    {LANGUAGES.map((lang) => (
                      <div
                        key={lang}
                        className="room-nav-lang-select-option"
                        onClick={() => {
                          handleLanguageChange({ target: { value: lang } } as any);
                          setIsDropdownOpen(false);
                        }}
                      >
                        <span>{lang}</span>
                        {lang === language && <span style={{ fontSize: "10px", color: "#c40000", fontWeight: "bold" }}>✓</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={runCode}
                className="room-nav-run-btn"
              >
                <span style={{ fontSize: "10px" }}>▶</span> run
              </button>
            </div>


            {/* <button style={{
                  all:"unset",
                  height:"30px",
                  width:"80px",
                  backgroundColor:"#0474C4",
                  display:"flex",
                  borderRadius:"2px",
                  color:"white",
                  fontFamily:"monospace",
                  alignItems:"center",
                  justifyContent:"center"
                }}>copy link</button> */}


            <button
              className="copy-btn"
              onClick={CopyLink}
            >
              copy link
            </button>

          </div>




          {/* hhooo */}



          {/* hooo  */}

          {/* Right */}
          <div className="room-nav-right">

            <div className="room-users-list">






              {users.map((u) => (
                <div
                  key={u.socketId}
                  title={u.username}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    backgroundColor: u.color || "#2cbb5d",
                    color: "#1a1a1a",
                    fontSize: "11px",
                    textTransform: "capitalize",
                    fontWeight: "bold",

                    border: "2px solid #262626"
                  }}
                >
                  {u.username ? u.username.slice(0, 2) : "?"}
                </div>
              ))}




              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "wheat",
                  borderRadius: "6px",
                  padding: "4px 4px",
                  fontSize: "12px",
                }}
              >
                <span
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    backgroundColor: "#2cbb5d",
                  }}
                />
                <span>Live {usersCount}</span>
              </div>
            </div>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                backgroundColor: "#262626",
                border: "1px solid #333333",
                borderRadius: "6px",
                padding: "4px 10px",
                fontSize: "12px",
              }}
            >
              <span style={{ color: "#8a8a8a" }}>Room:</span>
              <span
                style={{
                  color: "#eff1f6",
                  fontWeight: "600",
                  fontFamily: "Consolas, 'Courier New', monospace",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>

                  {roomId}

                  <img src="/copy.svg" className="copy-img" onClick={copyToClipboard}></img>
                </div>

              </span>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: "rgb(48,48,54)", flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }} >

          <EditorComp code={code} language={language} handleCodeChange={handleCodeChange} />

          <Console output={output} setOutput={setOutput} />

        </div>

      </div>
    </>
  );
}
