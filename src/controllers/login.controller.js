import { User } from "../models/user.model.js"
import { ApiError } from "../utils/apiError.util.js"
import { ApiResponse } from "../utils/apiResponse.util.js"
import { asyncHandler } from "../utils/asyncHandler.util.js"

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body
  console.log(username, password)
  try {
    const user = await User.findOne({ username })

    if (!user) {
      throw new ApiError(401, "Invalid username or password")
    }

    const correct = await user.isPasswordCorrect(password)

    if (!correct) {
      throw new ApiError(401, "Invalid username or password")
    }

    const accessToken = await user.generateAccessToken()

    return res
      .status(200)
      .json(new ApiResponse(200, { accessToken }, "Login Successful"))
  } catch (error) {
    console.error("Login error:", error.message)
    throw error
  }
})

export default loginUser
