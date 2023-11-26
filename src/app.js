import express from "express"
import cors from "cors"

const app = express()

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
)

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))

import userRouter from "./routes/user.routes.js"
import postsRoute from "./routes/post.routes.js"

app.use("/api/v1/users", userRouter)
app.use("/api/v1/posts", postsRoute)

export { app }
