// getComments.controller.js
import { Comment } from "../models/comment.model.js"
import { Post } from "../models/post.model.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/apiError.util.js"

// Controller to fetch comments for a post
const getComments = async (req, res, next) => {
  try {
    const postId = req.params.id

    // Find the post and populate the comments field
    const post = await Post.findById(postId).populate(
      "comments.user",
      "username"
    )

    if (!post) {
      throw new ApiError(404, "Post not found")
    }

    const commentIds = post.comments // Adjust this based on your actual comment structure
    const comments = await Comment.find({ _id: { $in: commentIds } })

    res.json({
      status: "success",
      data: comments,
    })
  } catch (error) {
    next(error)
  }
}

export { getComments }
