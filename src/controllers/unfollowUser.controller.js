import { User } from "../models/user.model"
import { ApiError } from "../utils/apiError.util"
import { ApiResponse } from "../utils/apiResponse.util"
import { asyncHandler } from "../utils/asyncHandler.util"

export const UnfollowUser = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id

    const followingUser = await User.findById(id)
    if (!followingUser) {
      return res.status(404).json(new ApiError(404, "No such users found"))
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { following: id },
      },
      {
        new: true,
      }
    )

    const unfollowedUser = await User.findByIdAndUpdate(
      id,
      {
        $pull: { followers: req.user._id },
      },
      {
        new: true,
      }
    )

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Unfollowed user successfully"))
  } catch (error) {
    console.log(error.message)
    return res
      .status(500)
      .json(new ApiError(500, "Internal server error", error))
  }
})
