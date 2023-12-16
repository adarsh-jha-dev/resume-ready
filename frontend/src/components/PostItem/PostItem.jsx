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
          `${
            import.meta.env.VITE_APP_BACKEND_BASE_URL
          }/api/v1/users/getuser/${user}`,
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
      <div
        className="max-w-sm rounded-xl shadow-lg transition-all duration-500 hover:scale-110 bg-gray-500 border-gray-200 
      "
      >
        <Link className="flex flex-col" to={`/post/${_id}`}>
          <div className="flex justify-center h-[250px]">
            <img
              className="rounded-t-lg border-white border h-full w-auto"
              src={photos[0]?.url || "../../../public/default.jpg"}
              alt="image"
            />
          </div>
        </Link>
        <div className="p-5">
          <Link to={`/post/${_id}`}>
            <h5 className="mb-4 sm:h-[40px] text-start text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {title.length > 25 ? title?.slice(0, 25) + "..." : title}
            </h5>
          </Link>
          <p className="mb-3 border sm:h-[200px] md:h-[150px] border-white rounded-xl p-2 text-start font-normal text-white">
            {content?.length > 100 ? content.slice(0, 100) + "..." : content}
          </p>
          <Link
            to={`/post/${_id}`}
            className="inline-flex items-center px-3 py-2 bg-gray-600 rounded-xl hover:text-black hover:bg-white transition-colors duration-200 ease-in-out border-1 border-white"
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
