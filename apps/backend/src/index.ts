import express from "express"
import codeRouter from "./routes/code"
import http from "http"
import setupSocket from "./socket"
import roomRouter from "./routes/room"


const app=express()

const server = http.createServer(app);



app.use(express.json())
app.use(express.urlencoded({extended:true}))

setupSocket(server)

app.get("/health",(req,res)=>{
    res.end("server is healthy")
})

app.use("/api/code",codeRouter)
app.use("/api/rooms",roomRouter)


server.listen(3000,()=>{
    console.log("sever has started")
})