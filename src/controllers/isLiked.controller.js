import { ApiError } from "../utils/apiError.util.js"
import { asyncHandler } from "../utils/asyncHandler.util.js"
import { Post } from "../models/post.model.js"

export const isLiked = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id
    const user = req.user

    const post = await Post.findById(id)
    if (!post) {
      return res.status(404).json(new ApiError(404, "No such posts"))
    }

    const userLiked = post.likes.includes(user._id)

    if (userLiked) {
      return res
        .status(200)
        .json({ message: "User has already liked the post", success: true })
    } else {
      return res
        .status(200)
        .jsON({ message: "User has not liked the post", success: false })
    }
  } catch (error) {
    console.log(error.message)
    return res
      .status(500)
      .json(new ApiError(500, "Internal server error", error))
  }
})
