import express from "express"
import setupSocket from "./socket"
import cookieParser from "cookie-parser"
import http from "http"
import cors from "cors"

import connectDB from "./config/db"

import codeRouter from "./routes/code"
import roomRouter from "./routes/room"
import authRouter from "./routes/auth"

const app=express()

app.use(cors({
   origin: "http://localhost:5173",
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

connectDB()
const server = http.createServer(app);



app.use(express.json())
app.use(express.urlencoded({extended:true}))

setupSocket(server)

app.get("/health",(req,res)=>{
    res.end("server is healthy")
})

app.use("/api/code",codeRouter)
app.use("/api/rooms",roomRouter)
app.use("/api/auth",authRouter)



server.listen(3000,()=>{
    console.log("sever has started")
})