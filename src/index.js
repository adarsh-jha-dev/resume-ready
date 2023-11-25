// require('dotenv').config({path: './env'})
import dotenv from "dotenv"
import connectToAtlas from "./db/index.js"
import { app } from "./app.js"
dotenv.config({
  path: "./.env",
})

connectToAtlas()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running at port : ${process.env.PORT}`)
    })
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err)
  })
