// Comment.jsx
import React, { useEffect, useState } from "react"
import Spinner from "./Spinner"
import axios from "axios"
import CommentItem from "./CommentItem"

const CommentSection = ({ id }) => {
  const [loading, setLoading] = useState(false)
  const [comments, setComments] = useState([])

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true)
      try {
        const commentsResponse = await axios.get(
          `${
            import.meta.env.VITE_APP_BACKEND_BASE_URL
          }/api/v1/posts/post/${id}/comments`
        )
        setComments(commentsResponse.data.data)
      } catch (error) {
        console.error("Error fetching comments:", error)
      }
      setLoading(false)
    }

    fetchComments()
  }, [id])

  if (loading) {
    return <Spinner message="Fetching comments..." />
  } else {
    return (
      <div className="w-full">
        {comments.map((comment) => (
          <CommentItem key={comment._id} {...comment} />
        ))}
      </div>
    )
  }
}

export default CommentSection
