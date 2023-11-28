import { Comment } from "../models/comment.model.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/apiError.util.js"
import { ApiResponse } from "../utils/apiResponse.util.js"
import { asyncHandler } from "../utils/asyncHandler.util.js"

const getComments = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id

    const user = await User.findById(id)

    if (!user) {
      throw new ApiError(409, "No such users exist")
    }

    const comments = await Comment.find({ user: user._id })

    res
      .status(200)
      .json(new ApiResponse(200, comments, "Comments fetched successfully"))
  } catch (error) {
    console.log(error.message)
    throw new ApiError(500, "Internal server error")
  }
})

export { getComments }
