import React, { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { FaHeart, FaComment } from "react-icons/fa"
import UserContext from "../context/userContext"
import Spinner from "./Spinner.jsx"
import CommentSection from "./CommentSection.jsx"
import NavBar from "./Navbar.jsx"
import CommentForm from "./CommentForm.jsx"
import { useAlert } from "../context/AlertContext.jsx"
import EditModal from "./EditModal.jsx"

const Post = () => {
  const showAlert = useAlert()
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const { id } = useParams()
  const [post, setPost] = useState({})
  const [loading, setLoading] = useState(false)
  const [owner, setOwner] = useState({})
  const [isLiked, setIsLiked] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [checkUser, setCheckUser] = useState(false)
  const [commentDisabled, setCommentDisabled] = useState(false)
  const [error, setError] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        const likeResponse = await axios.get(
          `${
            import.meta.env.VITE_APP_BACKEND_BASE_URL
          }/api/v1/posts/isliked/${id}`,
          {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        )
        if (likeResponse.data.success) {
          setIsLiked(true)
        } else {
          setIsLiked(false)
        }
      } catch (error) {
        setError(error.message)
      }
    })()

    const fetchPostAndComments = async () => {
      try {
        const postResponse = await axios.get(
          `${
            import.meta.env.VITE_APP_BACKEND_BASE_URL
          }/api/v1/posts/getpost/${id}`
        )
        setPost(postResponse.data.data)

        const userResponse = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/api/v1/users/getuser/${
            postResponse.data.data.user
          }`
        )

        setOwner(userResponse.data.data)
        setCheckUser(user && user._id === userResponse.data.data._id)
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

  const handleLike = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (isLiked) {
        const disliked = await axios.put(
          `${
            import.meta.env.VITE_APP_BACKEND_BASE_URL
          }/api/v1/posts/dislike/${id}`,
          {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        )

        if (disliked.data.success) {
          setIsLiked(false)
        }
      } else {
        const liked = await axios.put(
          `${
            import.meta.env.VITE_APP_BACKEND_BASE_URL
          }/api/v1/posts/likepost/${id}`,
          {},
          {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        )
        if (liked.data.status === 200) {
          setIsLiked(true)
        }
      }
      const postResponse = await axios.get(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }/api/v1/posts/getpost/${id}`
      )
      setPost(postResponse.data.data)
    } catch (error) {
      setError(error.message)
      console.error("Error liking the post:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    setIsModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    setLoading(true)

    try {
      const response = await axios.delete(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }/api/v1/posts/deletepost/${id}`,
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      )
      navigate("/home")
    } catch (error) {
      showAlert("Something went wrong", "error")
      console.error(error)
    } finally {
      setLoading(false)
      setIsModalOpen(false)
    }
  }

  const handleCancelDelete = () => {
    setIsModalOpen(false)
  }

  const handleCommentAdded = async () => {
    // Fetch updated post data after a comment is added
    const postResponse = await axios.get(
      `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/api/v1/posts/getpost/${id}`
    )

    // Update the comments state in the Post component
    setPost(postResponse.data.data)
  }

  const handleEdit = async (editedPost) => {
    setLoading(true)
    try {
      const edited = await axios.put(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/api/v1/posts/edit/${id}`,
        editedPost,
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      )

      if (edited) {
        setLoading(false)
        navigate(`/post/${id}`)
      }
    } catch (error) {
      navigate("/home")
      console.log(error)
    }
    setIsEditModalOpen(false)
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
        {isEditModalOpen && (
          <EditModal
            post={post}
            onEdit={handleEdit}
            onCancel={() => setIsEditModalOpen(false)}
          />
        )}

        {isModalOpen && (
          <div class="relative px-4 bg-red-400 md:flex md:items-center md:justify-center">
            <div class="bg-black opacity-25 w-full h-full absolute z-10 inset-0"></div>
            <div class="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
              <div class="md:flex items-center">
                <div class="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                  <p className="text-white text-start">Are you sure?</p>
                </div>
              </div>
              <div class="text-center md:text-right mt-4 md:flex md:justify-end">
                <button
                  onClick={handleConfirmDelete}
                  class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
                >
                  Delete Post
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4
                  md:mt-0 md:order-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto mt-8 p-6 bg-gray-500 border-white border-2 rounded-2xl shadow">
          <div className="flex justify-between items-center">
            <div className="mb-6 bg-gray-600 w-full flex flex-col rounded-3xl p-4">
              <h2 className="text-3xl text-start text-white font-bold mb-2">
                {post.title}
              </h2>
              <p className="text-white text-start">
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
            {checkUser && (
              <div className="mb-6 w-[200px] ml-2 flex flex-col rounded-2xl p-4">
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="bg-green-500 hover:bg-green-400 text-white px-2 py-2 rounded-2xl mb-2"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-400 text-white px-2 py-2 rounded-2xl"
                >
                  Delete
                </button>
              </div>
            )}
          </div>

          {/* Content section */}
          <div className="mb-6 flex border p-4 rounded-2xl border-white justify-start">
            <p className="text-white text-start">{post.content}</p>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            {/* Images section */}
            <div className="flex overflow-x-auto gap-4">
              {(post.photos || []).map((photo, index) => (
                <div
                  key={photo._id}
                  className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3"
                >
                  <img
                    src={photo.url}
                    alt="img"
                    className="w-full h-auto border-white bg-white rounded-md cursor-pointer"
                  />
                </div>
              ))}
            </div>

            {/* Videos section */}
            <div className="flex flex-wrap gap-4">
              {(post.videos || []).map((video, index) => (
                <div
                  key={video._id}
                  className="flex justify-between w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2"
                >
                  <video
                    autoPlay
                    controls
                    src={video.url}
                    alt="video"
                    className="w-full h-auto border-gray-700 bg-white rounded-md cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to={`/profile/${owner._id}`}>
                <img
                  src={owner.avatar}
                  alt={owner.username}
                  className="lg:h-[100px] sm:h-[55px] rounded-2xl sm:w-auto lg:w-auto"
                />
              </Link>
              <div className="flex flex-col">
                <p className="text-sm text-black font-semibold">
                  {owner.username}
                </p>
                <small className="text-black">
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
                className="flex items-center text-xs text-black"
                onClick={handleLike}
              >
                {isLiked ? (
                  <FaHeart className="text-red-500 mr-1" />
                ) : (
                  <FaHeart className="mr-1 text-black" />
                )}
                {post.likes && post.likes.length}
              </button>
              <button
                disabled={!user}
                className="flex items-center text-xs text-black"
                onClick={() => setCommentDisabled(!commentDisabled)}
              >
                <FaComment className="mr-1" />
                {post.comments && post.comments.length}
              </button>
            </div>
          </div>
          {commentDisabled && (
            <div className="w-full mt-2">
              <div className="bg-gray-600 rounded-2xl p-2">
                <CommentForm postId={id} onCommentAdded={handleCommentAdded} />
              </div>
              <div className="flex justify-center">
                <CommentSection id={id} />
              </div>
            </div>
          )}
        </div>
      </>
    )
  }
}

export default Post
