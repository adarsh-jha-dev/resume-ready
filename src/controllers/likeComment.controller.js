import { Comment } from "../models/comment.model.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/apiError.util.js"
import { ApiResponse } from "../utils/apiResponse.util.js"
import { asyncHandler } from "../utils/asyncHandler.util.js"

const likeComment = asyncHandler(async (req, res) => {
  try {
    const commentId = req.params.id
    const user = req.user

    // Check if the comment exists
    const comment = await Comment.findById(commentId)
    if (!comment) {
      throw new ApiError(404, "No such comment")
    }

    // Check if the user has already liked the comment
    if (comment.likes.includes(user._id)) {
      return res
        .status(200)
        .json(new ApiResponse(200, {}, "You have already liked the comment"))
    }

    // Add the user to the likes array of the comment
    comment.likes.push(user._id)
    const updatedComment = await comment.save()

    if (!updatedComment) {
      throw new ApiError(500, "Some error occurred while liking the comment")
    }

    // Add the liked comment to the user's likedComments array
    const updatedUser = await User.updateOne(
      { _id: user._id },
      {
        $push: { likedComments: comment._id },
      }
    )

    if (!updatedUser) {
      // If updating the user fails, consider rolling back the comment update
      throw new ApiError(500, "Some error occurred while updating user likes")
    }

    res
      .status(200)
      .json(new ApiResponse(200, updatedComment, "Comment liked successfully"))
  } catch (error) {
    console.error(error.message)
    if (error instanceof ApiError) {
      throw error
    } else {
      throw new ApiError(500, "Something went wrong while liking the comment")
    }
  }
})

export { likeComment }
