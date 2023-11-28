import { Comment } from "../models/comment.model.js"
import { ApiError } from "../utils/apiError.util.js"
import { ApiResponse } from "../utils/apiResponse.util.js"
import { asyncHandler } from "../utils/asyncHandler.util.js"

const editComment = asyncHandler(async (req, res) => {
  try {
    const commentId = req.params.id
    const { content } = req.body

    // Check if the comment exists
    const comment = await Comment.findById(commentId)

    if (!comment) {
      throw new ApiError(404, "Comment not found")
    }

    // Check if the user is the owner of the comment
    console.log(comment.user.toString(), req.user._id.toString())
    if (comment.user.toString() !== req.user._id.toString()) {
      throw new ApiError(403, "Unauthorized to edit this comment")
    }

    // Update the comment content
    comment.content = content
    const updatedComment = await comment.save()

    res
      .status(200)
      .json(
        new ApiResponse(200, updatedComment, "Comment updated successfully")
      )
  } catch (error) {
    console.error(error.message)
    throw new ApiError(500, "Internal server error")
  }
})

export { editComment }
