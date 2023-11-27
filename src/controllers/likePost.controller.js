import { Post } from "../models/post.model.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/apiError.util.js"
import { ApiResponse } from "../utils/apiResponse.util.js"
import { asyncHandler } from "../utils/asyncHandler.util.js"

const likePost = asyncHandler(async (req, res) => {
  try {
    const postId = req.params.id
    const post = await Post.findById(postId)

    if (!post) {
      throw new ApiError(400, "No such post")
    }

    const userId = req.user._id

    //  if the user has already liked the post
    const alreadyLiked = await User.exists({
      _id: userId,
      likedPosts: { $in: [postId] },
    })

    if (alreadyLiked) {
      return res
        .status(200)
        .json(new ApiResponse(200, null, "You have already liked this post"))
    }

    // Update the like count in the Post model
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $set: {
          likes: post.likes + 1,
        },
      },
      { new: true }
    )

    // Update the likedPosts array in the User model
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          likedPosts: postId,
        },
      },
      { new: true }
    )

    if (!updatedPost || !updatedUser) {
      throw new ApiError(500, "Some error occurred while liking the post")
    }

    res
      .status(200)
      .json(new ApiResponse(200, updatedPost, "Post liked successfully"))
  } catch (error) {
    console.error(error.message)
    throw new ApiError(500, "Internal server error")
  }
})

export { likePost }
