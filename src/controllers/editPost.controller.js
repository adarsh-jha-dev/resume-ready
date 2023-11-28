import { asyncHandler } from "../utils/asyncHandler.util.js"
import { ApiError } from "../utils/apiError.util.js"
import { ApiResponse } from "../utils/apiResponse.util.js"
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "../utils/cloudinary.js"
import { Post } from "../models/post.model.js"

const editPost = asyncHandler(async (req, res) => {
  try {
    const postId = req.params.id
    const post = await Post.findById(postId)

    if (!post) {
      throw new ApiError(404, "Post not found")
    }

    if (post.user.toString() !== req.user._id.toString()) {
      throw new ApiError(403, "Unauthorized to edit this post")
    }

    const { title, content } = req.body
    const { photos, videos } = req.files || { photos: null, videos: null }

    let photosUrls = []
    let videosUrls = []

    if (photos) {
      for (const photo of post.photos) {
        const deletedPhotos = await deleteFromCloudinary(photo.public_id)
        if (!deletedPhotos) {
          throw new ApiError(500, "Post not updated successfully")
        }
      }

      const photosLocalPaths = photos.map((photo) => photo?.path)
      const photosUploadPromises = photosLocalPaths.map(async (photoPath) => {
        try {
          const { url, public_id } = await uploadToCloudinary(photoPath)
          if (!url || !public_id) {
            return null
          }
          return { url, public_id }
        } catch (error) {
          console.error("Error uploading photo:", error)
          return null
        }
      })
      photosUrls = await Promise.all(photosUploadPromises)
    }

    if (videos) {
      for (const video of post.videos) {
        const deletedVideos = await deleteFromCloudinary(video.public_id)
        if (!deletedVideos) {
          throw new ApiError(500, "Post not updated successfully")
        }
      }

      const videosLocalPaths = videos.map((video) => video?.path)
      const videosUploadPromises = videosLocalPaths.map(async (videoPath) => {
        try {
          const { url, public_id } = await uploadToCloudinary(videoPath)
          if (!url || !public_id) {
            return null
          }
          return { url, public_id }
        } catch (error) {
          console.error("Error uploading video:", error)
          return null
        }
      })
      videosUrls = await Promise.all(videosUploadPromises)
    }

    // Save the updated post
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $set: {
          title: title ? title : post.title,
          content: content ? content : post.content,
          photos: photos ? photosUrls : post.photos,
          videos: videos ? videosUrls : post.videos,
        },
      },
      { new: true } // Return the modified document
    )

    res
      .status(200)
      .json(new ApiResponse(200, updatedPost, "Post updated successfully"))
  } catch (error) {
    console.error(error.message)
    throw new ApiError(500, "Internal server error")
  }
})

export { editPost }
