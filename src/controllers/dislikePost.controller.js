import { asyncHandler } from "../utils/asyncHandler.util.js"
import { Post } from "../models/post.model.js"
import { ApiResponse } from "../utils/apiResponse.util.js"
import { ApiError } from "../utils/apiError.util.js"
import { User } from "../models/user.model.js"

export const dislikePost = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id
    const post = await Post.findById(id)
    if (!post) {
      return res.status(404).json(new ApiError(404, "No such posts found"))
    }
    const updatedPost = await Post.findByIdAndUpdate(post._id, {
      $pull: { likes: req.user._id },
    })

    const updatedUser = await User.findByIdAndUpdate(req.user._id, {
      $pull: { likedPosts: post._id },
    })

    if (updatedPost && updatedUser) {
      return res
        .status(200)
        .json({ message: "Post disliked successfully", success: true })
    } else {
      return res
        .status(400)
        .json({ message: "Something went wrong", success: false })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json(new ApiError(500, "Internal server error"))
  }
})
