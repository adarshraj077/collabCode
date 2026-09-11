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

# collabCode

### A real-time collaborative code editor for interviews, pair programming, and teaching.

<p>
  <a href="#about">About</a> •
  <a href="#key-features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#installation--setup">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#license">License</a>
</p>

</div>

<br />

<div align="center">
  <video src="./demo.mp4" autoplay loop muted playsinline width="100%"></video>
</div>

<br />

---

## About

A real-time collaborative code editor for writing, sharing, and running code together — built for interviews, pair programming, and remote teaching. Runs entirely in the browser, nothing to install.

---

## Key Features

| Feature | Description |
|---|---|
| **Real-Time Collaboration** | Instant sync via WebSockets. Rooms shared in seconds, no account needed to join. |
| **Code Editor** | Syntax highlighting, auto-complete, multi-language support. |
| **Integrated Execution** | Run code and view live console output, including errors, in-editor. |
| **Accounts & Dashboard** | JWT auth with a dashboard to manage past rooms. |
| **Performance** | Vite + React frontend; Node.js, Express & Redis backend;  |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, TypeScript, Vite |
| Backend | Node.js, Express.js |
| Real-time | WebSocket |
| Database | MongoDB |
| Cache / Pub-Sub | Redis |


---

## Installation & Setup

**Prerequisites**
[Bun](https://bun.sh/) installed, plus a running MongoDB and Redis instance (local or remote).

**1. Clone the repository**
```bash
git clone https://github.com/adarshraj077/collabCode.git
cd collabCode
```

**2. Start the backend**
```bash
cd backend
bun install
bun run dev
```

**3. Start the frontend**
```bash
cd frontend
bun install
bun run dev
```

Open the frontend URL in your browser and you're ready to go.

---

## Usage

. Share the room link with your collaborators
. Code together in real time, and run it to see output instantly

---

## Contributing

Contributions and feature requests are welcome. Check the [issues page](https://github.com/adarshraj077/collabCode/issues) or open a pull request.

---

<br />

<div align="center">
Built for developers.
</div>