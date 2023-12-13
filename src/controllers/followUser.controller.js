import { User } from "../models/user.model.js"
import { ApiError } from "../utils/apiError.util.js"
import { ApiResponse } from "../utils/apiResponse.util.js"
import { asyncHandler } from "../utils/asyncHandler.util.js"

export const followUser = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id
    const followedUser = await User.findById(id)
    if (!followedUser) {
      throw new ApiError(404, "No such users")
    }

    // Check if the user is already following the specified user
    const alreadyFollowing = await User.findOne({
      _id: req.user._id,
      following: { $in: [id] },
    })

    if (alreadyFollowing) {
      return res.json(
        new ApiResponse(400, null, "User is already being followed.")
      )
    }

    await User.findByIdAndUpdate(followedUser._id, {
      $push: { followers: req.user._id },
    })

    const updatedUser = await User.findByIdAndUpdate(req.user._id, {
      $push: { following: followedUser._id },
    })

    res.json(new ApiResponse(200, updatedUser, "User followed successfully"))
  } catch (error) {
    console.log(error)
    throw new ApiError(error.message)
  }
})
