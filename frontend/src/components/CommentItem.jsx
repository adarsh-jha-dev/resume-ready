import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import Spinner from "./Spinner"
import { useNavigate } from "react-router-dom"
import { HiPencil, HiTrash, HiSave } from "react-icons/hi"
import UserContext from "../context/userContext"
import { MdOutlineEdit } from "react-icons/md"

const CommentItem = ({ _id, user: commentUser, post, content, createdAt }) => {
  const { user } = useContext(UserContext)
  const [editable, setEditable] = useState(false)
  const [editedContent, setEditedContent] = useState(content)
  const [commenter, setCommenter] = useState({})
  const [isOwner, setIsOwner] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)

    // const createdAtDate = new Date(createdAt)
    // const currentDate = new Date()
    // const timeDifference = currentDate - createdAtDate
    // const daysAgo = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))

    const fetchCommenter = async () => {
      const commenterResponse = await axios.get(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }/api/v1/users/getuser/${commentUser}`
      )
      setCommenter(commenterResponse.data.data)
    }

    fetchCommenter()
    setIsOwner(commentUser === user?._id)
    setLoading(false)

    // Clean up editable state and editedContent when component unmounts
    return () => {
      setEditable(false)
      setEditedContent(content)
    }
  }, [_id, commentUser, content, createdAt, user])

  const handleEditToggle = () => {
    setEditable(!editable)
  }

  const handleSaveEdit = async () => {
    try {
      setLoading(true)

      // Make a request to edit the comment
      await axios.put(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }/api/v1/comments/edit/${_id}`,
        { content: editedContent },
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      )
      navigate(`/post/${post}`)
      setLoading(false)
    } catch (error) {
      console.error("Error editing comment:", error.message)
    }
  }

  const handleDeleteClick = async () => {
    // TODO: Add logic to handle deleting the comment
    setLoading(true)
    try {
      const deleteResponse = await axios.delete(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }/api/v1/comments/delete/${_id}`,
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      )
    } catch (error) {
      console.log(error)
    } finally {
      // Redirect to the post after deleting
      navigate(`/post/${post}`)
      setLoading(false)
    }
  }

  if (loading) {
    return <Spinner message="Fetching comment..." />
  } else {
    return (
      <div className="bg-white dark:bg-gray-600 rounded-2xl w-full mb-2 mt-2">
        <div className="p-4 antialiased flex">
          <img
            className="rounded-full h-10 w-10 mr-2 mt-1"
            src={commenter.avatar}
            alt={`${commenter.username}'s Avatar`}
          />
          <div className="w-full">
            <div className="bg-gray-100 flex justify-between dark:bg-gray-700 rounded-3xl px-4 pt-2 pb-2.5">
              <div>
                <div className="font-semibold text-start text-sm leading-relaxed">
                  {commenter.username}
                </div>
                {editable ? (
                  <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="text-normal w-full text-white text-start leading-snug md:leading-normal bg-transparent border-none resize-none focus:outline-none focus:ring focus:border-blue-300"
                  />
                ) : (
                  <div className="text-normal text-start leading-snug md:leading-normal">
                    {content}
                  </div>
                )}
              </div>
              <div className="flex items-center">
                {isOwner && !editable && (
                  <>
                    <button
                      className="mr-2 h-[20px]"
                      onClick={handleEditToggle}
                    >
                      <MdOutlineEdit />
                    </button>
                    <button
                      className="bg-red-500 h-[25px]"
                      onClick={handleDeleteClick}
                    >
                      <HiTrash />
                    </button>
                  </>
                )}
                {isOwner && editable && (
                  <button className="bg-none" onClick={handleSaveEdit}>
                    <HiSave />
                  </button>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center mt-2"></div>
          </div>
        </div>
      </div>
    )
  }
}

export default CommentItem
