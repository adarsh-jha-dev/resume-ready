import { Post } from "../models/post.model.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/apiError.util.js"
import { ApiResponse } from "../utils/apiResponse.util.js"
import { asyncHandler } from "../utils/asyncHandler.util.js"

const getUserLikedPosts = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id
    const user = await User.findById(userId)

    if (!user) {
      throw new ApiError(404, "No such user exists")
    }

    // console.log("User Liked Posts (Before Conversion):", user.likedPosts)

    const userLikedPosts = await Post.find({ _id: { $in: user.likedPosts } })

    // console.log("User Liked Posts (Result):", userLikedPosts)

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          userLikedPosts,
          "User's liked posts fetched successfully"
        )
      )
  } catch (error) {
    console.error(error.message)
    throw new ApiError(
      500,
      "Something went wrong while fetching user's liked posts"
    )
  }
})

export { getUserLikedPosts }
