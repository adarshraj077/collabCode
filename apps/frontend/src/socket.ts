import { io } from "socket.io-client";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL.replace("localhost", window.location.hostname).replace("/api", "");
const socket = io(BACKEND_URL, {
  auth: (cb) => {
    cb({ token: localStorage.getItem("token") || "" });
  }
});
export default socket;
