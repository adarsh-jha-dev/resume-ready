import { asyncHandler } from "../utils/asyncHandler.util.js"
import { ApiError } from "../utils/apiError.util.js"
import { ApiResponse } from "../utils/apiResponse.util.js"
import { uploadToCloudinary } from "../utils/cloudinary.js"
import { Post } from "../models/post.model.js"
import { User } from "../models/user.model.js"

const makePost = asyncHandler(async (req, res) => {
  const { title, content } = req.body

  if (!title) {
    throw new ApiError(409, "Title is required")
  }

  if (!content) {
    throw new ApiError(409, "Content is required")
  }
  const photos = req.files?.photos
  const videos = req.files?.videos

  const photosLocalPaths = []
  const videosLocalPaths = []

  if (photos) {
    photos.forEach((photo) => {
      photosLocalPaths.push(photo.path)
    })
  }

  if (videos) {
    videos.forEach((video) => {
      videosLocalPaths.push(video.path)
    })
  }

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

  const videosUploadPromises = videosLocalPaths.map(async (videoPath) => {
    try {
      const { url, public_id } = await uploadToCloudinary(videoPath)
      console.log(url, public_id)
      if (!url || !public_id) {
        return null // Skip if either URL or publicId is missing
      }

      return { url, public_id }
    } catch (error) {
      console.error("Error uploading video:", error)
      return null
    }
  })

  const photosUrls = await Promise.all(photosUploadPromises)
  const videosUrls = await Promise.all(videosUploadPromises)

  const post = await Post.create({
    user: req.user._id,
    title,
    content,
    photos: photosUrls.filter((data) => data !== null),
    videos: videosUrls.filter((data) => data !== null),
  })

  const createdPost = Post.findById(post._id)
  if (!createdPost) {
    throw new ApiResponse(500, "Something went wrong while making the post")
  }

  const userId = req.user._id // Extract logged-in user's ID

  await User.findByIdAndUpdate(
    userId,
    { $push: { posts: post._id } }, // Add post ID to user's posts array
    { new: true }
  )

  return res
    .status(200)
    .json(new ApiResponse(200, post, "Post created successfully"))
})

export default makePost
