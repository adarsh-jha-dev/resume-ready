import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./PostItem.css"
import Spinner from "../Spinner.jsx"

const PostItem = ({ _id, user, title, content, photos, videos, createdAt }) => {
  const formattedDate = new Date(createdAt).toLocaleString()
  const [owner, setOwner] = useState({})
  const token = localStorage.getItem("auth-token")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/users/getuser/${user}`,
          {
            headers: {
              "auth-token": token,
            },
          }
        )
        setOwner(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchUser()
    setLoading(false)
  }, [user])

  if (loading) {
    return <Spinner message="Fetching Post..." />
  } else {
    return (
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <Link to={`/post/${_id}`}>
          <img
            className="rounded-t-lg h-[200px] w-full bg-gray-500 align-middle"
            src={photos[0]?.url}
            alt="image"
          />
        </Link>
        <div className="p-5">
          <Link to={`/post/${_id}`}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {title}
            </h5>
          </Link>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {content?.length > 100 ? content.slice(0, 100) + "..." : content}
          </p>
          <Link
            to={`/post/${_id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Read more
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
        </div>
      </div>
    )
  }
}

export default PostItem
