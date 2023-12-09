import axios from "axios"
import React, { useEffect, useState } from "react"

const PostItem = ({ user, title, content, photos, videos, createdAt }) => {
  const formattedDate = new Date(createdAt).toLocaleString()
  const [owner, setOwner] = useState({})
  const token = localStorage.getItem("auth-token")

  useEffect(() => {
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
  }, [user])

  return (
    <div className="max-w-2xl mx-auto bg-white border border-gray-300 mb-8 rounded-md shadow-md overflow-hidden">
      {/* Post Header */}
      <div className="flex items-center p-4 border-b border-gray-300">
        <img
          src={owner.avatar}
          alt={owner.name}
          className="w-12 h-12 object-cover rounded-full mr-4"
        />
        <div>
          <p className="text-base font-semibold">{`${owner.firstname} ${owner.lastname}`}</p>
          <p className="text-sm text-gray-500">{formattedDate}</p>
        </div>
      </div>

      {/* Post Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-700">{content}</p>
      </div>

      {/* Media (Photos or Videos) */}
      <div className="grid grid-cols-2 gap-4 p-4">
        {photos &&
          photos.map((photo, index) => (
            <img
              key={index}
              src={photo.url}
              alt={`Photo ${index + 1}`}
              className="w-full h-32 object-cover rounded-md"
            />
          ))}
        {videos &&
          videos.map((video, index) => (
            <video
              key={index}
              src={video.url}
              controls
              className="w-full h-32 rounded-md"
            ></video>
          ))}
      </div>

      {/* User Information */}
      <div className="flex items-center justify-between bg-gray-100 p-4">
        <div className="flex items-center">
          <img
            src={owner.avatar}
            alt={owner.name}
            className="w-8 h-8 object-cover rounded-full mr-2"
          />
          <div>
            <p className="text-sm font-semibold">{`${owner.firstname} ${owner.lastname}`}</p>
            <p className="text-xs text-gray-500">{owner.username}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostItem
