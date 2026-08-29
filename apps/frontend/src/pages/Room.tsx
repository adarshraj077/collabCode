import { useParams, useNavigate } from "react-router-dom";
import ErrorPopUp from "../components/ErrorPopUp";
import EditorComp from "../components/Editor";
import { useRoomSocket } from "../utils/roomSocket";
import Console from "../components/Console";


const LANGUAGES = ["javascript", "typescript", "c", "cpp", "go"];

export default function Room() {
    const { roomId: routeRoomId } = useParams<{ roomId: string }>();
    const roomId = routeRoomId ?? localStorage.getItem("roomId") ?? "";
    const navigate = useNavigate();

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
          
           <div
             style={{
               display: "flex",
               alignItems: "center",
               justifyContent: "space-between",
               backgroundColor: "#1a1a1a",
               padding: "0 16px",
               height: "48px",
               borderBottom: "1px solid #2d2d2d",
               fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
               fontSize: "13px",
               boxSizing: "border-box",
               userSelect: "none",
             }}
           >
             {/* Left: Home */}
             <div style={{ display: "flex", alignItems: "center", minWidth: "180px" }}>
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
                <img src="/arrow_back.svg" style={{height:"13px"}} alt="home" />home
               </span>
             </div>

             {/* Center: Language Select & Run */}
             <div
               style={{
                 display: "flex",
                 alignItems: "center",
                 gap: "6px",
                 backgroundColor: "#262626",
                 padding: "3px 4px",
                 borderRadius: "8px",
                 border: "1px solid #333333",
               }}
             >
               <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                 <select
                   value={language}
                   onChange={handleLanguageChange}
                   style={{
                     backgroundColor: "#333333",
                     appearance: "none",
                     WebkitAppearance: "none",
                     MozAppearance: "none",
                     color: "#e6e6e6",
                     border: "none",
                     borderRadius: "6px",
                     padding: "5px 24px 5px 10px",
                     outline: "none",
                     fontSize: "12px",
                     fontWeight: "500",
                     cursor: "pointer",
                   }}
                 >
                   {LANGUAGES.map((lang) => (
                     <option
                       key={lang}
                       value={lang}
                       style={{
                         backgroundColor: "#262626",
                         color: "#e6e6e6",
                       }}
                     >
                       {lang}
                     </option>
                   ))}
                 </select>
                 <span
                   style={{
                     position: "absolute",
                     right: "8px",
                     fontSize: "9px",
                     color: "#8a8a8a",
                     pointerEvents: "none",
                   }}
                 >
                   ▼
                 </span>
               </div>

               <button
                 onClick={runCode}
                 style={{
                   display: "inline-flex",
                   alignItems: "center",
                   gap: "0px",
                   backgroundColor: "#1b753a",
                   color: "#ffffff",
                   border: "none",
                   borderRadius: "6px",
                   padding: "5px 12px",
                   fontFamily:"monospace",
                   fontSize: "12px",
                   cursor: "pointer",
                   transition: "background-color 0.15s ease",
                 }}
                 onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#249e4f")}
                 onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2cbb5d")}
               >
                 <span style={{ fontSize: "10px" }}>▶</span> run
               </button>
             </div>

             {/* Right */}
             <div
               style={{
                 display: "flex",
                 alignItems: "center",
                 justifyContent: "flex-end",
                 minWidth: "180px",
               }}
             >
               <div style={{ display: "flex", alignItems: "center", gap: "6px", marginRight: "12px" }}>
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
                       fontWeight: "bold",
                       textTransform: "uppercase",
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
                   {roomId}
                 </span>
               </div>
             </div>
           </div>

           <div style={{backgroundColor: "rgb(48,48,54)", flex: 1, display: "flex", flexDirection: "column", overflow: "hidden"}} >
             
             <EditorComp code={code} language={language} handleCodeChange={handleCodeChange} />

              <Console output={output} setOutput={setOutput} />
              
           </div>

         </div>
      </>
    );
}
