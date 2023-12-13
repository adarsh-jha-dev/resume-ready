import { User } from "../models/user.model.js"
import { ApiError } from "../utils/apiError.util.js"
import { ApiResponse } from "../utils/apiResponse.util.js"
import { asyncHandler } from "../utils/asyncHandler.util.js"

export const getFollowers = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id // Retrieve user ID from params
    const user = await User.findById(userId)

    if (!user) {
      throw new ApiError(404, "User not found")
    }

    const followers = user.followers
    const users = await User.find({ _id: { $in: followers } })
    res.json(new ApiResponse(200, users, "Followers fetched successfully"))
  } catch (error) {
    console.error(error)
    throw new ApiError(500, error.message)
  }
})
