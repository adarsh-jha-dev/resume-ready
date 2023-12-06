import { User } from "../models/user.model.js"
import { Post } from "../models/post.model.js"
import { Comment } from "../models/comment.model.js"
import { asyncHandler } from "../utils/asyncHandler.util.js"
import { ApiError } from "../utils/apiError.util.js"
import { ApiResponse } from "../utils/apiResponse.util.js"
import { deleteFromCloudinary } from "../utils/cloudinary.js"

const deleteUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id
    const user = await User.findById(userId)

    if (!user) {
      throw new ApiError(404, "User not found")
    }

    // Delete user's posts and associated media
    for (const postId of user.posts) {
      const post = await Post.findById(postId)

      if (post) {
        // Delete post's media from Cloudinary
        await post.photos.forEach(async (photo) => {
          await deleteFromCloudinary(photo.public_id)
        })

        await post.videos.forEach(async (video) => {
          await deleteFromCloudinary(video.public_id)
        })

        // Delete the post
        await Post.findByIdAndDelete(postId)
      }
    }

    // Delete user's comments
    await Comment.deleteMany({ user: userId })

    // Finally, delete the user
    await User.findByIdAndDelete(userId)

    res
      .status(200)
      .json(new ApiResponse(200, null, "User deleted successfully"))
  } catch (error) {
    console.log(error.message)
    throw new ApiError(500, "Internal server error")
  }
})

export default deleteUser
