import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/apiError.util.js"

const fetchUser = async (req, res, next) => {
  try {
    const token = req.header("auth-token")
    if (!token) {
      throw new ApiError(401, "Login required")
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    const user = User.findById(decoded._id)
    if (!user) {
      throw new ApiError(401, "Login Required")
    }
    req.user = user
    next()
  } catch (error) {
    console.log(error.message)
    throw new ApiError(401, "Login Required")
  }
}

export default fetchUser
