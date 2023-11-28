import { Post } from "../models/post.model.js"
import { ApiError } from "../utils/apiError.util.js"
import { ApiResponse } from "../utils/apiResponse.util.js"
import { asyncHandler } from "../utils/asyncHandler.util.js"

const getPosts = asyncHandler(async (req, res) => {
  try {
    const posts = await Post.find()
    res
      .status(200)
      .json(new ApiResponse(200, posts, "Posts fetched successfully"))
  } catch (error) {
    console.log(error.message)
    throw new ApiError(500, "Internal server error")
  }
})

export { getPosts }
