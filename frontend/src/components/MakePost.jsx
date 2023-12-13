import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const MakePost = () => {
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
        "http://localhost:8000/api/v1/posts/createnewpost",
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

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold   mb-4">{loading ? "Loading" : ""}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="text-gray-700">
            Title:
          </label>
          <input
            className="w-full text-black p-2 border rounded"
            type="text"
            id="title"
            name="title"
            value={post.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="text-gray-700">
            Content:
          </label>
          <textarea
            className="w-full text-black p-2 border rounded"
            id="content"
            name="content"
            value={post.content}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="images" className="text-gray-700">
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
          <div className="flex overflow-x-auto space-x-2">
            {post.photos.map((file, index) => (
              <div key={index} className="w-16 h-16 overflow-hidden">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="videos" className="text-gray-700">
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
          <div className="flex overflow-x-auto space-x-2">
            {post.videos.map((file, index) => (
              <div key={index} className="w-16 h-16 overflow-hidden">
                <video
                  autoPlay
                  controls={false}
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <div>
          <button
            className="bg-green-500 text-white p-2 rounded hover:bg-green-700"
            type="button"
            onClick={handleSubmit}
          >
            Post
          </button>
        </div>
      </form>
    </div>
  )
}

export default MakePost
