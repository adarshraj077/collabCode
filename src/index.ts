import express from "express"
import codeRouter from "./routes/code"


const app=express()


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/health",(req,res)=>{
    res.end("server is healthy")
})

app.use("/code",codeRouter)


app.listen(3000,()=>{
    console.log("sever has started")
})