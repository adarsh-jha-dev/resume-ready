import React, { useContext, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { AiOutlineClose } from "react-icons/ai"
import UserContext from "../context/userContext"
import Spinner from "./Spinner"

const MakePost = () => {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [post, setPost] = useState({
    title: "",
    content: "",
    photos: [],
    videos: [],
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }))
  }

  const handleImageChange = (e) => {
    const files = e.target.files
    setPost((prevPost) => ({
      ...prevPost,
      photos: [...prevPost.photos, ...files],
    }))
  }

  const handleVideoChange = (e) => {
    const files = e.target.files
    setPost((prevPost) => ({
      ...prevPost,
      videos: [...prevPost.videos, ...files],
    }))
  }

  const handleRemoveImage = (index) => {
    setPost((prevPost) => {
      const updatedPhotos = [...prevPost.photos]
      updatedPhotos.splice(index, 1)
      return { ...prevPost, photos: updatedPhotos }
    })
  }

  const handleRemoveVideo = (index) => {
    setPost((prevPost) => {
      const updatedVideos = [...prevPost.videos]
      updatedVideos.splice(index, 1)
      return { ...prevPost, videos: updatedVideos }
    })
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append("title", post.title)
      formData.append("content", post.content)

      post.photos.forEach((photo, index) => {
        formData.append("photos", photo)
      })

      post.videos.forEach((video, index) => {
        formData.append("videos", video)
      })

      const response = await axios.post(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }/api/v1/posts/createnewpost`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      )

      console.log(response.data)
      setLoading(false)
      navigate("/home")
      // Add any other handling for success
    } catch (error) {
      console.error("Error making post:", error)
      // Add handling for error
    }
  }

  if (!user) {
    return (
      <div className="flex align-middle justify-center">
        <h1 className="mt-[100px] text-center text-red-600">
          Please{" "}
          <Link className=" underline hover:text-blue-500" to="/login">
            Login
          </Link>{" "}
          to post something
        </h1>
      </div>
    )
  } else {
    return (
      <div className="mx-auto mt-8 p-6 bg-gray-500 w-full rounded-3xl shadow">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          {loading ? (
            <Spinner message="Creating your post" textColor="green" />
          ) : (
            "Create a New Post"
          )}
        </h2>
        <form className="space-y-4 w-full" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="title"
              className="block text-start text-2xl font-medium text-black"
            >
              Title:
            </label>
            <input
              className="m-1 p-3 rounded-2xl bg-gray-200 text-black text-xl w-full border focus:outline-none focus:ring focus:border-blue-300"
              type="text"
              id="title"
              name="title"
              value={post.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-start text-black"
            >
              Content:
            </label>
            <textarea
              className="mt-1 text-black p-3 w-full h-[250px] border rounded-3xl bg-gray-200 focus:outline-none focus:ring focus:border-blue-300"
              id="content"
              name="content"
              value={post.content}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col justify-around">
            <label
              htmlFor="images"
              className="block text-sm text-start font-medium text-gray-700"
            >
              Images:
            </label>
            <input
              type="file"
              id="images"
              name="images"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
            {/* Display uploaded image files */}
            <div className="flex space-x-2 mt-2">
              {post.photos.map((file, index) => (
                <div
                  key={index}
                  className="relative group flex-shrink-0 w-20 h-20"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index}`}
                    className="h-[100px] w-auto object-cover cursor-pointer transition duration-300 transform group-hover:shadow-lg rounded-md"
                  />
                  <AiOutlineClose
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 text-red-400 opacity-0 group-hover:opacity-100 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <label
              htmlFor="videos"
              className="block text-sm text-start font-medium text-gray-700"
            >
              Videos:
            </label>
            <input
              type="file"
              id="videos"
              name="videos"
              multiple
              accept="video/*"
              onChange={handleVideoChange}
            />
            {/* Display uploaded video files */}
            <div className="flex space-x-2 mt-2">
              {post.videos.map((file, index) => (
                <div
                  key={index}
                  className="relative group flex-shrink-0 w-20 h-20"
                >
                  <video
                    autoPlay
                    controls={false}
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index}`}
                    className="h-[100px] w-[400px] object-cover cursor-pointer transition duration-300 transform group-hover:shadow-lg rounded-md"
                  />
                  <AiOutlineClose
                    onClick={() => handleRemoveVideo(index)}
                    className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end mt-2">
            {!loading ? (
              <button
                className="w-[100px] bg-green-500 text-white rounded-full hover:bg-green-700 focus:outline-none focus:ring focus:border-blue-300"
                type="button"
                onClick={handleSubmit}
                disabled={loading}
              >
                Post
              </button>
            ) : (
              <p>Posting...</p>
            )}
          </div>
        </form>
      </div>
    )
  }
}

export default MakePost
