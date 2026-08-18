import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import socket from "../socket";
import { useDebouncedCallback } from "use-debounce";
import defaultCodeSnippets from "../utils/defaultSnippets";
import normalizeLanguage from "../utils/language";


const LANGUAGES = ["javascript", "typescript", "c", "cpp", "go"];

 
export default function Room() {
    const { roomId: routeRoomId } = useParams<{ roomId: string }>();
    const roomId = routeRoomId ?? localStorage.getItem("roomId") ?? "";
     const [code, setCode] = useState("// start coding...");
     const [language, setLanguage] = useState("javascript");
     const [output, setOutput] = useState("");
     const [usersCount,setUsersCount]=useState(1);
    

     const lastSentCode = useRef("");  // stores the last code sent to the server
     const currentLanguage = useRef("javascript");  // track current language for handlers

     useEffect(() => {
        currentLanguage.current = language;  // update ref whenever language changes
         
     }, [language]);

     useEffect(() => {
        if (!roomId) return;

        const joinRoom = () => {
          socket.emit("join-room", roomId);
        };

        const handleRoomState = (room: { code?: string; language?: string }) => {
          const currentLang = normalizeLanguage(room.language || "javascript");
          const defaultCode = defaultCodeSnippets[currentLang] || "// start coding...";
          const initialCode = room.code || defaultCode;
          
          setCode(initialCode);
          setLanguage(currentLang);
          lastSentCode.current = initialCode;

          if (!room.code) {
            socket.emit("code-change", { roomId, code: initialCode });
          }
        };

        const handleCodeUpdate = ({ code }: { code: string }) => {
          if(code === lastSentCode.current) {
             lastSentCode.current = defaultCodeSnippets[currentLanguage.current] || "";  // reset last sent code to default for the current language
            return; // Ignore if the code is the same as the last sent code
          }
          setCode(code);
        };

        const handleLanguageUpdate = ({ language }: { language: string }) => {
          const normalized = normalizeLanguage(language);
          setLanguage(normalized);
          setCode(defaultCodeSnippets[normalized] || "");
        };

        const handleCodeResult = (result: { stderr?: string; stdout?: string; error?: string }) => {
          const text = result.stdout || result.stderr || result.error || "No output";
          setOutput(String(text).trim() || "No output");
        };
      
   
          const userCount=({ count }: { count: number })=>{
            // console.log("Users in room:", count);
            setUsersCount(count++);
          
          }
       

        socket.on("room-state", handleRoomState);
        socket.on("code-update", handleCodeUpdate);
        socket.on("language-update", handleLanguageUpdate);
        socket.on("code-result", handleCodeResult);
        socket.on("room-users",userCount)
        if (socket.connected) {
          joinRoom();
        } else {
          socket.once("connect", joinRoom);

        }

        return () => {
          socket.off("room-state", handleRoomState);
          socket.off("code-update", handleCodeUpdate);
          socket.off("language-update", handleLanguageUpdate);
          socket.off("code-result", handleCodeResult);
          socket.off("connect", joinRoom);
          socket.off("room-users",userCount);

        
        };
      }, [roomId]);



const handleLanguageChange =(e :React.ChangeEvent<HTMLSelectElement>)=>{
    const newLanguage = normalizeLanguage(e.target.value);
    const newCode = defaultCodeSnippets[newLanguage] || "";
    setLanguage(newLanguage);
    setCode(newCode);
     lastSentCode.current = newCode;  
    socket.emit("language-change", { roomId, language: newLanguage });
    socket.emit("code-change", { roomId, code: newCode }); // sync new code to server 
    
}

        const emitCodeChange =useDebouncedCallback((code :string)=>{
                socket.emit("code-change", { roomId, code });
            },500);

const handleCodeChange = (value : string | undefined) => {
 const newCode = value || "";
  setCode(newCode);
    
    lastSentCode.current = newCode; 
    emitCodeChange(newCode);
}


const runCode = () => {
     setOutput("Running...");
    socket.emit("run-code", { roomId });
  };


    return (<>
         <div style={{ display: "flex", flexDirection: "column", gap: 0, height: "100vh", overflow: "hidden" }}>
   
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
      onClick={() => (window.location.href = "/")}
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
     <img src="/arrow_back.svg" style={{height:"1vw"}} />home
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
        gap: "5px",
        backgroundColor: "#1b753a",
        color: "#ffffff",
        border: "none",
        borderRadius: "6px",
        padding: "5px 12px",
        fontSize: "12px",
        fontWeight: "600",
        cursor: "pointer",
        transition: "background-color 0.15s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#249e4f")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2cbb5d")}
    >
      <span style={{ fontSize: "10px" }}>▶</span> Run
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

     {usersCount>1?( 
      <div style={{ display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          color:"wheat",
          borderRadius: "6px",
          padding: "4px 10px",
          fontSize: "12px",}}>

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

  ):null}



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

      <div
      style={{
        height: "70vh",
        margin: 0,
        padding: 0,
        lineHeight: 0,
        overflow: "hidden"
      }}
    >
      <Editor
        height="100%"
        width="100%"
        path={language}
        language={language}
        value={code}
        onChange={handleCodeChange}
        theme="vs-dark"
       
        options={{
          fontSize: 13,
          contextmenu: false,
          padding: {
            top: 0,
            bottom: 0,
          },
          minimap: {
            enabled:true,
              scale: 1.8,
             maxColumn: 200,
             size: "proportional",
            
             renderCharacters: false,
          }
       
        }}
      />
    </div>


      <div style={{ borderRadius: "5px" ,backgroundColor: "#1A1A1A" ,color:"#A1A1AA",margin:"0",padding:"0",marginTop:"0", minHeight: "200px", overflowY: "auto", overflowX: "hidden", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{marginTop:"0",fontSize:"20px",borderBottom:"1px solid #3E3E42", position: "sticky", top: 0, zIndex: 10,borderTop:"1px solid #3E3E42", height: "2.5vw",paddingLeft:"2vw",display:"flex",alignItems:"center",justifyContent:"space-between",paddingRight:"2vw",backgroundColor: "#1A1A1A"}}>
         <span>console</span>
         <p style={{fontSize:"14px",fontWeight:"lighter" , cursor:"pointer", margin: 0}} onClick={()=>{setOutput("")}}>clear</p>
        </div>
      
    
      
    {!output || output.trim() === "" ? (
      <p style={{color:"#A1A1AA",paddingTop:"1vw",paddingLeft:"2vw" }}>Run your code to see output here</p> 
      
    ) : (
  <pre style={{color:"#FAFAFA",paddingTop:"1vw",paddingLeft:"2vw"}}>{output}</pre> 
  
)}
        
      </div>

    </div>
    </div>
    
    </>)
}
