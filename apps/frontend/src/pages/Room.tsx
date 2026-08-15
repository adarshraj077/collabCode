import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import socket from "../socket";
import { useDebouncedCallback } from "use-debounce";
import defaultCodeSnippets from "../utils/defaultSnippets";
const LANGUAGES = ["javascript", "typescript", "c", "cpp", "go"];

const normalizeLanguage = (value: string) => {
  if (value === "js") return "javascript";
  if (value === "ts") return "typescript";
  return value;
};


export default function Room() {
    const { roomId: routeRoomId } = useParams<{ roomId: string }>();
    const roomId = routeRoomId ?? localStorage.getItem("roomId") ?? "";
     const [code, setCode] = useState("// start coding...");
     const [language, setLanguage] = useState("javascript");
     const [output, setOutput] = useState("");
    

     const lastSentCode = useRef("");  // stores the last code sent to the server
     const currentLanguage = useRef("javascript");  // track current language for handlers

     useEffect(() => {
        currentLanguage.current = language;  // update ref whenever language changes
            //  lastSentCode.current = defaultCodeSnippets[normalizeLanguage(language)] || ""; 
     }, [language]);

     useEffect(() => {
        if (!roomId) return;

        const joinRoom = () => {
          socket.emit("join-room", roomId);
        };

        const handleRoomState = (room: { code?: string; language?: string }) => {
          setCode(room.code || defaultCodeSnippets[normalizeLanguage(room.language || "javascript")] || "// start coding...");
          setLanguage(normalizeLanguage(room.language || "javascript"));
          
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
          const text = result.stderr || result.stdout || result.error || "No output";
          setOutput(String(text).trim() || "No output");
        };

        socket.on("room-state", handleRoomState);
        socket.on("code-update", handleCodeUpdate);
        socket.on("language-update", handleLanguageUpdate);
        socket.on("code-result", handleCodeResult);

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
        };
      }, [roomId]);



const handleLanguageChange =(e :React.ChangeEvent<HTMLSelectElement>)=>{
    const newLanguage = normalizeLanguage(e.target.value);
    const newCode = defaultCodeSnippets[newLanguage] || "";
    setLanguage(newLanguage);
    setCode(newCode);
     lastSentCode.current = newCode;  
    socket.emit("language-change", { roomId, language: newLanguage });
    socket.emit("code-change", { roomId, code: newCode });  // Also sync the new code to server
    
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

     // only the creator of the room is able to remove the code currently for now 
     //these

    return (<>
         <div>
      <div>
        <span>Room: {roomId}</span>

        <select value={language} onChange={handleLanguageChange}>
          {LANGUAGES.map((lang) => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>

        <button onClick={runCode}>Run</button>
      </div>

      <Editor
        height="70vh"
        language={language}
        value={code}
        onChange={handleCodeChange}
        theme="vs-dark"
      />

      <pre>{output}</pre>
    </div>
    
    </>)
}
