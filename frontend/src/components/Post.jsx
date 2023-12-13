// Post.jsx
import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { FaHeart, FaComment } from "react-icons/fa"
import UserContext from "../context/userContext"
import Spinner from "./Spinner.jsx"
import CommentSection from "./CommentSection.jsx"
import NavBar from "./Navbar.jsx"
import CommentForm from "./CommentForm.jsx"

const Post = () => {
  const { user } = useContext(UserContext)
  const { id } = useParams()
  const [post, setPost] = useState({})
  const [loading, setLoading] = useState(false)
  const [owner, setOwner] = useState({})
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    setLoading(true)
    const fetchPostAndComments = async () => {
      try {
        const postResponse = await axios.get(
          `http://localhost:8000/api/v1/posts/getpost/${id}`
        )
        setPost(postResponse.data.data)

        const userResponse = await axios.get(
          `http://localhost:8000/api/v1/users/getuser/${postResponse.data.data.user}`
        )
        setOwner(userResponse.data.data)
        setLoading(false)
      } catch (error) {
        console.error(
          "Error fetching post and comments:",
          error.message,
          error.response
        )
        setLoading(false)
      }
    }

    fetchPostAndComments()
  }, [id])

  const handleLike = async () => {
    try {
      await axios.post(`http://localhost:8000/api/v1/posts/${id}/like`)
      setIsLiked(!isLiked)
    } catch (error) {
      console.error("Error liking the post:", error)
    }
  }

  const handleComment = () => {
    // Implement your desired logic for handling comments
  }

  if (loading) {
    return (
      <>
        <NavBar user={user} />
        <Spinner message="Fetching Post Details..." />
      </>
    )
  } else {
    return (
      <>
        <NavBar />
        <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded shadow">
          {/* Title and Date section */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-black justify-start mb-2">
              {post.title}
            </h2>
            <p className="text-gray-500">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>

          {/* Content section */}
          <div className="mb-6">
            <p className="text-gray-700">{post.content}</p>
          </div>

          {/* Images section */}
          <div className="flex flex-wrap gap-4 mt-4">
            {post.photos?.map((photo) => (
              <div
                key={photo._id}
                className="flex justify-between w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3"
              >
                <img
                  src={photo.url}
                  alt="img"
                  className="w-full h-auto border-gray-700 bg-white rounded-md"
                />
              </div>
            ))}
          </div>

          {/* Videos section */}
          <div className="flex flex-wrap gap-4 mt-4">
            {post.videos?.map((video) => (
              <div
                key={video._id}
                className="flex justify-between w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2"
              >
                <video
                  autoPlay
                  controls
                  src={video.url}
                  alt="video"
                  className="w-full h-auto border-gray-700 bg-white rounded-md"
                />
              </div>
            ))}
          </div>

          {/* Author details, likes, and comments section */}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img
                src={owner.avatar}
                alt={owner.username}
                className="w-[50px] h-auto rounded-full"
              />
              <div className="flex flex-col p-2">
                <p className="text-sm text-black font-semibold">
                  {owner.username}
                </p>
                <small className="text-gray-600">
                  {owner.firstname} {owner.lastname}
                </small>
                <p className="text-sm text-black font-semibold">
                  {owner.posts?.length} Posts | {owner.followers?.length}{" "}
                  Followers
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                className="flex items-center text-xs text-gray-500"
                onClick={handleLike}
              >
                {isLiked ? (
                  <FaHeart className="text-red-500 mr-1" />
                ) : (
                  <FaHeart className="mr-1" />
                )}
                {post.likes && post.likes.length}
              </button>
              <button
                className="flex items-center text-xs text-gray-500"
                onClick={handleComment}
              >
                <FaComment className="mr-1" />
                {post.comments && post.comments.length}
              </button>
            </div>
          </div>
          <div className="bg-white p-2">
            <CommentForm postId={id} />
          </div>
          <div className={`flex justify-center`}>
            <CommentSection id={id} />
          </div>
        </div>
      </>
    )
  }
}

export default Post
