import { io } from "socket.io-client";

import { BACKEND_URL } from "./config";

const socket = io(BACKEND_URL.replace("/api", ""), {
  auth: (cb) => {
    cb({ token: localStorage.getItem("token") || "" });
  }
});
export default socket;
