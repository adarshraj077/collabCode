<div align="center">

<img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React" />
<img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
<img src="https://img.shields.io/badge/express.js-%23000000.svg?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
<img src="https://img.shields.io/badge/websocket-%23000000.svg?style=for-the-badge&logo=socket.io&logoColor=white" alt="WebSocket" />
<img src="https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white" alt="Redis" />
<img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
<img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
<img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />

<br /><br />

# ⚡ collabCode

### A real-time collaborative code editor for interviews, pair programming, and teaching.

<p>
  <a href="#-key-features">Features</a> •
  <a href="#️-tech-stack">Tech Stack</a> •
  <a href="#️-installation--setup">Installation</a> •
  <a href="#-usage">Usage</a> •
  <a href="#-license">License</a>
</p>

</div>

<br />

<div align="center">
  <img src="./frontend/public/main.png" alt="collabCode Preview" width="100%">
</div>

<br />

---

## 📖 About

**collabCode** is a robust, real-time collaborative code editor that lets developers write, share, and execute code together — instantly. Built for technical interviews, pair programming, and remote teaching, it delivers a seamless, low-latency coding environment right in the browser, with no setup required for participants.

---

## ✨ Key Features

<table>
<tr>
<td width="50%" valign="top">

### 🔄 Real-Time Collaboration
- **Simultaneous editing** — changes sync instantly across every connected user via WebSockets
- **Room management** — spin up a coding room and share the link in one click

### 🖊️ Advanced Code Editor
- **Syntax highlighting & auto-complete** for a true IDE feel
- **Multi-language support** for writing and running code in your language of choice

</td>
<td width="50%" valign="top">

### ▶️ Integrated Code Execution
- **Run code on the fly** — no context switching, no separate terminal
- **Live console output** — compilation & runtime errors shown in a terminal-style panel

### 🔐 Auth & Dashboard
- **JWT-secured accounts** with a clean registration/login flow
- **Personal dashboard** to manage and revisit past coding rooms

</td>
</tr>
</table>

### ⚡ Performance & Architecture
- **Blazing-fast frontend** — Vite + React + TypeScript for a snappy UI
- **Scalable backend** — Node.js, Express & Redis handle WebSocket traffic efficiently at scale
- **Dockerized** — containerized for easy, consistent deployment anywhere

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React, TypeScript, Vite |
| **Backend** | Node.js, Express.js |
| **Real-time** | WebSocket |
| **Database** | MongoDB |
| **Cache / Pub-Sub** | Redis |
| **Deployment** | Docker |

---

## 🚀 Installation & Setup

### Prerequisites
- [Bun](https://bun.sh/) installed
- MongoDB & Redis running locally or accessible remotely

### 1. Clone the repository
```bash
git clone https://github.com/adarshraj077/collabCode.git
cd collabCode
```

### 2. Start the backend
```bash
cd backend
bun install
bun run dev
```

### 3. Start the frontend
```bash
cd frontend
bun install
bun run dev
```

Your app should now be running locally — open the frontend URL in your browser to get started. 🎉

---

## 🗺️ Usage

1. Sign up or log in to your account
2. Create a new room from your dashboard
3. Share the room link with your collaborators
4. Start coding together in real time — run code and see output instantly

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](https://github.com/adarshraj077/collabCode/issues) or open a pull request.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ for developers.**

</div>
