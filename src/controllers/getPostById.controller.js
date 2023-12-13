import { Post } from "../models/post.model.js"
import { ApiError } from "../utils/apiError.util.js"
import { ApiResponse } from "../utils/apiResponse.util.js"
import { asyncHandler } from "../utils/asyncHandler.util.js"

export const getPostById = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id
    if (!id) {
      throw new ApiError(400, "Please provide a valid id")
    }

    const post = await Post.findById(id)
    if (!post) {
      throw new ApiError(404, "No such posts found")
    }

    res.json(new ApiResponse(200, post, "Post found successfully"))
  } catch (error) {
    console.log(error)
    throw new ApiError(500, "Internal server error")
  }
})
