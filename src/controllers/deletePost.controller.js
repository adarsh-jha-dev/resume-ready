import { Post } from "../models/post.model.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/apiError.util.js"
import { ApiResponse } from "../utils/apiResponse.util.js"
import { asyncHandler } from "../utils/asyncHandler.util.js"
import { deleteFromCloudinary } from "../utils/cloudinary.js"

const deletePost = asyncHandler(async (req, res) => {
  try {
    const user = req.user
    const id = req.params.id

    console.log(id)

    const post = await Post.findById(id)
    if (!post) {
      throw new ApiError(404, "No such posts")
    }

    if (post.user.toString() !== user._id.toString()) {
      throw new ApiError(401, "Unauthorized")
    }

    await post.photos.forEach(async (photo) => {
      await deleteFromCloudinary(photo.public_id)
    })

    await post.videos.forEach(async (video) => {
      await deleteFromCloudinary(video.public_id)
    })

    const deleted = await Post.deleteOne(post)

    await User.findByIdAndUpdate(
      user._id,
      { $pull: { posts: post._id } }, // Add post ID to user's posts array
      { new: true }
    )

    if (!deleted) {
      throw new ApiError(500, "Some error occured while deleting the post")
    } else {
      res
        .status(200)
        .json(new ApiResponse(200, deleted, `Post deleted successfully`))
    }
  } catch (error) {
    console.log(error.message)
    throw new ApiError(500, "Internal server error")
  }
})

export { deletePost }
