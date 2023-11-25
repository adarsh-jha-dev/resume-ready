import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

const connectToAtlas = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_DB_URI}/${DB_NAME}`
    )
    console.log(
      `MONGODB CONNECTION ESTABLISHED !! HOST : ${connectionInstance.connection.host}`
    )
  } catch (error) {
    console.log(error.message)
  }
}

export default connectToAtlas
