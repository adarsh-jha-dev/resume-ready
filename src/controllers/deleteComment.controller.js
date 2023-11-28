import { Comment } from "../models/comment.model.js"
import { Post } from "../models/post.model.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/apiError.util.js"
import { ApiResponse } from "../utils/apiResponse.util.js"
import { asyncHandler } from "../utils/asyncHandler.util.js"

const deleteComment = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id
    const comment = await Comment.findById(id) // Await here

    const user = req.user

    if (!comment) {
      throw new ApiError(404, "No such comments")
    }
    if (comment.user.toString() !== user._id.toString()) {
      throw new ApiError(409, "Unauthorized")
    }

    const post = await Post.findById(comment.post.toString())
    const commentId = comment._id

    const deletedComment = await Comment.deleteOne({ _id: comment._id }) // Corrected syntax

    if (!deletedComment) {
      throw new ApiError(500, "Some error occurred while deleting the comment")
    }

    await User.updateOne(
      { _id: user._id },
      {
        $pull: { comments: commentId },
      }
    )

    await Post.updateOne(
      { _id: post._id },
      {
        $pull: { comments: commentId },
      }
    )

    res.status(200).json(new ApiResponse(200, "Comment deleted successfully"))
  } catch (error) {
    console.log(error.message)
    throw new ApiError(500, "Something went wrong while deleting the comment")
  }
})

export { deleteComment }
