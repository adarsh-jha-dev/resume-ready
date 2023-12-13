// CommentForm.jsx
import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const CommentForm = ({ postId }) => {
  const navigate = useNavigate()
  const [commentText, setCommentText] = useState("")
  const [loading, setLoading] = useState(false)

  const handleCommentSubmit = async (e) => {
    setLoading(true)

    try {
      // Make a request to your backend to submit the comment
      await axios.post(
        `http://localhost:8000/api/v1/comments/create/${postId}`,
        {
          content: commentText,
        },
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      )
      // Clear the comment text after submission
      setCommentText("")
      setLoading(false)
    } catch (error) {
      console.error("Error submitting comment:", error)
    }
  }

  return (
    <form onSubmit={handleCommentSubmit}>
      <textarea
        rows="3"
        placeholder="Write your comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        className="w-full text-black p-2 border rounded mb-2"
      ></textarea>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        {loading ? "Posting Comment..." : "Post Comment"}
      </button>
    </form>
  )
}

export default CommentForm
