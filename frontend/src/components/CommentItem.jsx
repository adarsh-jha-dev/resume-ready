import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import Spinner from "./Spinner"
import { useNavigate } from "react-router-dom"
import { HiOutlineHeart, HiMiniHeart } from "react-icons/hi2"
import UserContext from "../context/userContext"

// Import necessary libraries

const CommentItem = ({ id, user, post, content, likes, createdAt }) => {
  const [liked, setLiked] = useState(false)
  const [loading, setLoading] = useState(false)
  const [time, setTime] = useState(0)
  const [commenter, setCommenter] = useState({})
  const [isOwner, setIsOwner] = useState(false)
  const [likeCount, setLikeCount] = useState(likes.length) // Track the number of likes
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)

    const createdAtDate = new Date(createdAt)
    const currentDate = new Date()
    const timeDifference = currentDate - createdAtDate
    setTime(Math.ceil(timeDifference / (1000 * 60 * 60 * 24)))

    const fetchCommenter = async () => {
      const commenterResponse = await axios.get(
        `http://localhost:8000/api/v1/users/getuser/${user}`
      )
      setCommenter(commenterResponse.data.data)
    }

    fetchCommenter()
    setLoading(false)
    navigate(`/post/${post}`)
  }, [id])

  // Simulating logged-in user, replace with actual user data or state
  const loggedInUserId = "123" // Replace with actual user ID

  useEffect(() => {
    // Check if the logged-in user is the owner of the comment
    setIsOwner(loggedInUserId === user)
  }, [loggedInUserId, user])

  const handleLikeClick = async () => {
    // TODO: Add logic to handle liking the comment
    try {
      // Make a request to your likeComment API
      // Replace 'your_like_comment_api' with the actual endpoint
      await axios.post(`http://localhost:8000/api/v1/comments/like/${id}`)

      setLiked(!liked)
      setLikeCount(liked ? likeCount - 1 : likeCount + 1)
    } catch (error) {
      console.error("Error liking comment:", error.message)
      // Handle error as needed
    }
  }

  const handleEditClick = () => {
    // TODO: Add logic to handle editing the comment
    console.log("Edit clicked")
  }

  const handleDeleteClick = () => {
    // TODO: Add logic to handle deleting the comment
    console.log("Delete clicked")
  }

  if (loading) {
    return <Spinner message="Fetching comment..." />
  } else {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full mb-4">
        <div className="p-4 antialiased flex">
          <img
            className="rounded-full h-8 w-8 mr-2 mt-1"
            src={commenter.avatar}
            alt={`${commenter.username}'s Avatar`}
          />
          <div className="w-full">
            <div className="bg-gray-100 flex justify-between dark:bg-gray-700 rounded-3xl px-4 pt-2 pb-2.5">
              <div>
                <div className="font-semibold text-start text-sm leading-relaxed">
                  {commenter.username}
                </div>
                <div className="text-normal text-start leading-snug md:leading-normal">
                  {content}
                </div>
              </div>
              <div className="flex items-center">
                {isOwner && (
                  <div className="relative group">
                    <button
                      className="bg-none"
                      onClick={() => console.log("Options clicked")}
                    >
                      {/* Use a different icon for filled heart when liked */}
                      {liked ? <HiMiniHeart /> : <HiOutlineHeart />}
                    </button>
                    <div className="hidden group-hover:flex absolute right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg py-2">
                      <button
                        onClick={handleEditClick}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={handleDeleteClick}
                        className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-900"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
                {/* Display like count */}
                <div className="text-gray-500 dark:text-gray-400 mr-2">
                  {likeCount} {likeCount === 1 ? "like" : "likes"}
                </div>
                {/* Like button */}
                <button className="bg-white" onClick={handleLikeClick}>
                  {liked ? <HiMiniHeart /> : <HiOutlineHeart />}
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {time}d
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CommentItem
