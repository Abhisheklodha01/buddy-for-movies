import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { config } from 'dotenv'
import connectDB from './db/index.js'
import userRouter from './routes/user.route.js'


config()

const app = express()

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true

}))

app.use(express.json())
app.use(cookieParser())


connectDB()

app.get("/", (req, res) => {
    res.send("working fine")
})

app.use("/api/v1/users", userRouter)


export default app