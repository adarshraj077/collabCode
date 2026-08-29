import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../socket";
import defaultCodeSnippets from "./defaultSnippets";
import normalizeLanguage from "./language";
import { useDebouncedCallback } from "use-debounce";

export function useRoomSocket(roomId: string) {
  const navigate = useNavigate();
  const [users, setUsers] = useState<{socketId: string, username: string, color: string}[]>([]);
  const [usersCount, setUsersCount] = useState(1);
  const [roomError, setRoomError] = useState("");
  const [code, setCode] = useState("//refresh the page ");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const lastSentCode = useRef("");
  const currentLanguage = useRef("javascript");

  useEffect(() => {
    currentLanguage.current = language;
  }, [language]);

  const emitCodeChange = useDebouncedCallback((code: string) => {
    socket.emit("code-change", { roomId, code });
  }, 500);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = normalizeLanguage(e.target.value);
    const newCode = defaultCodeSnippets[newLanguage] || "";
    setLanguage(newLanguage);
    setCode(newCode);
    lastSentCode.current = newCode;
    socket.emit("language-change", { roomId, language: newLanguage });
    socket.emit("code-change", { roomId, code: newCode });
  };

  const handleCodeChange = (value: string | undefined) => {
    const newCode = value || "";
    setCode(newCode);
    lastSentCode.current = newCode;
    emitCodeChange(newCode);
  };

  const runCode = () => {
    setOutput("Running...");
    socket.emit("run-code", { roomId });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const handleConnectError = (err: Error) => {
      if (err.message === "Authentication error" || err.message === "Unauthorized") {
        localStorage.removeItem("token");
        setRoomError("Session expired. Please log in again.");
      }
    };

    socket.on("connect_error", handleConnectError);

    return () => {
      socket.off("connect_error", handleConnectError);
    };
  }, [navigate]);

  useEffect(() => {
    if (!roomId) return;

    const joinRoom = () => {
      socket.emit("join-room", roomId);
    };

    const handleRoomState = (room: { code?: string; language?: string; users?: any[] }) => {
      const currentLang = normalizeLanguage(room.language || "javascript");
      const defaultCode = defaultCodeSnippets[currentLang] || "// start coding...";
      const initialCode = room.code || defaultCode;

      setCode(initialCode);
      setLanguage(currentLang);
      lastSentCode.current = initialCode;

      if (room.users) {
        setUsers(room.users);
      }

      if (!room.code) {
        socket.emit("code-change", { roomId, code: initialCode });
      }
    };

    const handleCodeUpdate = ({ code }: { code: string }) => {
      if (code === lastSentCode.current) {
        lastSentCode.current = defaultCodeSnippets[currentLanguage.current] || "";
        return;
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

    const userCount = ({ count, users: roomUsers }: { count: number, users?: any[] }) => {
      setUsersCount(count);
      if (roomUsers) {
        setUsers(roomUsers);
      }
    };

    const handleError = (err: { message: string }) => {
      setRoomError(err.message);
    };

    socket.on("room-state", handleRoomState);
    socket.on("code-update", handleCodeUpdate);
    socket.on("language-update", handleLanguageUpdate);
    socket.on("code-result", handleCodeResult);
    socket.on("room-users", userCount);
    socket.on("error", handleError);

    socket.disconnect();
    socket.connect();
    socket.on("connect", joinRoom);

    return () => {
      socket.emit("leave-room", roomId);
      socket.off("room-state", handleRoomState);
      socket.off("code-update", handleCodeUpdate);
      socket.off("language-update", handleLanguageUpdate);
      socket.off("code-result", handleCodeResult);
      socket.off("connect", joinRoom);
      socket.off("room-users", userCount);
      socket.off("error", handleError);
    };
  }, [roomId]);

  return {
    code,
    language,
    output,
    users,
    usersCount,
    roomError,
    setCode,
    setOutput,
    handleLanguageChange,
    handleCodeChange,
    runCode
  };
}