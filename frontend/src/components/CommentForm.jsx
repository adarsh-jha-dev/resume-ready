// CommentForm.jsx
import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { IoSendSharp } from "react-icons/io5"

const CommentForm = ({ postId }) => {
  const navigate = useNavigate()
  const [commentText, setCommentText] = useState("")
  const [loading, setLoading] = useState(false)

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await axios.post(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }/api/v1/comments/create/${postId}`,
        {
          content: commentText,
        },
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      )
      setCommentText("")
      setLoading(false)
      // navigate to the same page so that the updates are visible
      navigate(`/post/${postId}`)
    } catch (error) {
      console.error("Error submitting comment:", error)
    }
  }

  return (
    <form onSubmit={handleCommentSubmit}>
      <textarea
        rows="4"
        placeholder="Write your comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        className="w-full mt-2 text-white bg-gray-700 p-3 border rounded-3xl"
      ></textarea>
      <button
        type="submit"
        disabled={loading}
        className="ml-[90%] text-start mr-[10px] text-white"
      >
        {loading ? "Posting Comment..." : <IoSendSharp />}
      </button>
    </form>
  )
}

export default CommentForm
