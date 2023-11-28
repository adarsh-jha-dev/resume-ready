import { User } from "../models/user.model.js"
import { ApiError } from "../utils/apiError.util.js"
import { ApiResponse } from "../utils/apiResponse.util.js"
import { asyncHandler } from "../utils/asyncHandler.util.js"

const getUserByUsername = asyncHandler(async (req, res) => {
  try {
    const { username } = req.body

    // case-insensitive regex to match usernames partially or completely
    const users = await User.find({
      username: { $regex: new RegExp(username, "i") },
    })

    res
      .status(200)
      .json(
        new ApiResponse(200, users, "Users fetched successfully by username")
      )
  } catch (error) {
    console.error(error.message)
    throw new ApiError(500, "Internal server error")
  }
})

export { getUserByUsername }
