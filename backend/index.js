import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import router from "./routes/authRoute.js"
import adminrouter from "./routes/adminCheckRoute.js"

const app= express()
app.use(express.json())
app.use(cookieParser())
app.use(urlencoded({extended:true}))

const corsOption = {
    origin: "http://localhost:5173",
    credentials:true
}
app.use(cors(corsOption))

app.use("/api/auth",router)
app.use("/api/auth",adminrouter)

const PORT = 8000
app.listen(PORT,()=>{
    console.log(`Listening at ${PORT}`);
})