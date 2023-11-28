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
    const user = await User.findById(decoded._id)
    if (!user) {
      throw new ApiError(401, "Login Required")
    }

    req.user = user
    next()
  } catch (error) {
    console.log(error.message)

    // Instead of throwing an error, send a response to the user
    res.status(401).json({
      status: 401,
      message: "Login Required",
    })
  }
}

export default fetchUser
