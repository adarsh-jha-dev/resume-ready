import { Comment } from "../models/comment.model.js"
import { Post } from "../models/post.model.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/apiError.util.js"
import { ApiResponse } from "../utils/apiResponse.util.js"
import { asyncHandler } from "../utils/asyncHandler.util.js"

const makeComment = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id
    const post = Post.findById(id)

    if (!post) {
      throw new ApiError(404, "No such posts")
    }

    const user = req.user

    const comment = await Comment.create({
      post: post._id,
      user: user._id,
      content: req.body.content,
    })

    if (!comment) {
      throw new ApiError(400, "Comment creation failed")
    }

    const updatedPost = await Post.updateOne(post._id, {
      $push: {
        comments: comment._id,
      },
    })

    const updateduser = await User.updateOne(user._id, {
      $push: {
        comments: comment._id,
      },
    })

    if (!updatedPost || !updateduser) {
      throw new ApiError(500, "Some error occured while comment creation")
    }

    res
      .status(200)
      .json(new ApiResponse(200, comment, "Comment created successfully"))
  } catch (error) {
    console.log(error.message)
    throw new ApiError(500, "Internal server error")
  }
})

export { makeComment }
