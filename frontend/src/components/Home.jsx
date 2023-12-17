import React, { useContext, useEffect, useState } from "react"
import axios from "axios"
import UserContext from "../context/userContext.jsx"
import NavBar from "./Navbar.jsx"
import PostItem from "./PostItem/PostItem.jsx"
import Spinner from "./Spinner.jsx"

const Home = () => {
  const { user } = useContext(UserContext)
  const [checkUser, setCheckUser] = useState(false)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const token = localStorage.getItem("auth-token")
    setCheckUser(!!token)

    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_APP_BACKEND_BASE_URL
          }/api/v1/posts/fetchallposts`
        )
        setPosts(response.data.data)
      } catch (error) {
        console.error("Error fetching posts:", error)
      }
    }

    fetchPosts()
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="bg-black">
        <Spinner message="Fetching posts..." textColor="white" />
      </div>
    )
  } else {
    return (
      <div className="bg-gray-400 rounded-2xl min-h-screen">
        <NavBar user={user} checkUser={checkUser} />
        <div className="max-w-7xl mx-auto mt-8 px-4 sm:px-6 pb-4 lg:px-8">
          {loading ? (
            <div className="w-full h-screen flex justify-center items-center bg-gray-700 rounded-lg">
              <Spinner message="Fetching posts, please wait..." />
            </div>
          ) : (
            <div>
              {posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.map((post) => (
                    <PostItem
                      key={post._id}
                      _id={post._id}
                      user={post.user}
                      title={post.title}
                      content={post.content}
                      photos={post.photos}
                      videos={post.videos}
                      createdAt={post.createdAt}
                    />
                  ))}
                </div>
              ) : (
                <div className="w-full h-screen flex justify-center items-center bg-gray-700 rounded-lg">
                  <h3>No Posts yet</h3>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Home
