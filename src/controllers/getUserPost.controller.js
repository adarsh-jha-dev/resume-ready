import { Post } from "../models/post.model.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/apiError.util.js"
import { ApiResponse } from "../utils/apiResponse.util.js"
import { asyncHandler } from "../utils/asyncHandler.util.js"

const getUserPosts = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id
    const user = await User.findById(userId)

    if (!user) {
      throw new ApiError(404, "No such user exists")
    }

    const userPosts = await Post.find({ user: userId })

    res
      .status(200)
      .json(
        new ApiResponse(200, userPosts, "User's posts fetched successfully")
      )
  } catch (error) {
    console.error(error.message)
    throw new ApiError(500, "Something went wrong while fetching user's posts")
  }
})

export { getUserPosts }
