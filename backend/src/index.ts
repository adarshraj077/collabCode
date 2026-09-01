import express from "express"
import setupSocket from "./socket"
import cookieParser from "cookie-parser"
import http from "http"
import cors from "cors"

import connectDB from "./config/db"
import { env } from "./config/env"

import codeRouter from "./routes/code"
import roomRouter from "./routes/room"
import authRouter from "./routes/auth"
import userRouter from "./routes/user"


const app=express()

app.use(cors({
   origin: env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

connectDB()
const server = http.createServer(app);

setupSocket(server)

app.get("/health",(req,res)=>{
    res.end("server is healthy")
})

app.use("/api/code",codeRouter)
app.use("/api/rooms",roomRouter)
app.use("/api/auth",authRouter)
app.use("/api/users",userRouter)


server.listen(env.PORT, "0.0.0.0", ()=>{
    console.log(`server has started on port ${env.PORT}`)
})