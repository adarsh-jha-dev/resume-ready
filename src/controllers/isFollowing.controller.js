import { User } from "../models/user.model.js"
import { ApiError } from "../utils/apiError.util.js"
import { asyncHandler } from "../utils/asyncHandler.util.js"

export const checkIfUserFollows = asyncHandler(async (req, res) => {
  try {
    const targetUserId = req.params.id
    const loggedInUserId = req.user._id
    const targetUser = await User.findById(targetUserId)
    if (!targetUser) {
      return res.status(404).json(new ApiError(404, "User not found"))
    }

    const isFollowing = targetUser.followers.includes(loggedInUserId)

    if (isFollowing) {
      return res.json({
        message: "User is already being followed",
        success: true,
      })
    } else {
      return res.json({ message: "User is not being followed", success: false })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json(new ApiError(500, "Internal Server Error"))
  }
})
