// Post.jsx
import React, { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
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
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    setLoading(true)
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
    try {
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

      if (!liked.data.data) {
        setIsLiked(true)
      }
    } catch (error) {
      console.error("Error liking the post:", error)
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

  const handleEdit = async (editedPost) => {
    setLoading(true)
    try {
      const edited = await axios.put(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/api/v1/posts/edit/${id}`,
        {
          editedPost,
        },
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
          <div id="popup-modal" className="modal">
            <div className="modal-content">
              <button
                type="button"
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={handleCancelDelete}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>

              <div class="p-4 md:p-5 text-center">
                <svg
                  class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete this post?
                </h3>

                <button
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
                  onClick={handleConfirmDelete}
                >
                  Yes, I'm sure
                </button>
                <button
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  onClick={handleCancelDelete}
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded shadow">
          <div className="flex justify-between">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-black justify-start mb-2">
                {post.title}
              </h2>
              <p className="text-gray-500">
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
            {checkUser ? (
              <div className="flex justify-between">
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="bg-green-500 border border-gray-200 hover:bg-green-300 w-[126px] rounded-xl"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-300 border border-gray-200 w-[126px] ml-1 rounded-xl"
                >
                  Delete
                </button>
              </div>
            ) : null}
          </div>

          {/* Content section */}
          <div className="mb-6 flex justify-start">
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
                onClick={() => setCommentDisabled(!commentDisabled)}
              >
                <FaComment className="mr-1" />
                {post.comments && post.comments.length}
              </button>
            </div>
          </div>
          {commentDisabled && (
            <div className="w-full m-2">
              <div className="bg-white p-2">
                <CommentForm postId={id} />
              </div>
              <div className={`flex justify-center`}>
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
