import { User } from "../models/user.model.js"
import { ApiError } from "../utils/apiError.util.js"
import { ApiResponse } from "../utils/apiResponse.util.js"
import { asyncHandler } from "../utils/asyncHandler.util.js"

export const getFollowing = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id // Retrieve user ID from params
    const user = await User.findById(userId)

    if (!user) {
      throw new ApiError(404, "User not found")
    }

    const following = user.following
    const users = await User.find({ _id: { $in: following } })
    res.json(new ApiResponse(200, users, "Following fetched successfully"))
  } catch (error) {
    console.error(error)
    throw new ApiError(500, error.message)
  }
})
