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
    setLoading(true)
    try {
      await axios.delete(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }/api/v1/comments/delete/${_id}`,
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      )
      setLoading(false)
    } catch (error) {
      console.log(error)
    } finally {
      navigate(`/post/${post}`)
    }
  }

  if (loading) {
    return <Spinner message="Fetching comment..." />
  } else {
    return (
      <div className="bg-white dark:bg-gray-600 rounded-2xl w-full mb-2 mt-2">
        <div className="p-4 antialiased flex flex-col md:flex-row">
          <img
            className="rounded-full h-10 w-10 mr-2 mt-1"
            src={commenter.avatar}
            alt={`${commenter.username}'s Avatar`}
          />
          <div className="w-full mt-2 md:mt-0">
            <div className="bg-gray-100 flex flex-col md:flex-row justify-between dark:bg-gray-700 rounded-3xl px-4 pt-2 pb-2.5">
              <div className="mb-2 md:mb-0 md:mr-4">
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
              <div className="flex justify-center space-x-2 items-center">
                {isOwner && !editable && (
                  <div className="flex justify-center">
                    <button
                      className="mr-2 w-[13px] h-[20px]"
                      onClick={handleEditToggle}
                    >
                      <MdOutlineEdit />
                    </button>
                    <button
                      className="bg-red-500 w-[19px] h-[25px]"
                      onClick={handleDeleteClick}
                    >
                      <HiTrash />
                    </button>
                  </div>
                )}
                {isOwner && editable && (
                  <button
                    className="bg-none w-[14px] h-[20px]"
                    onClick={handleSaveEdit}
                  >
                    <HiSave />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CommentItem
