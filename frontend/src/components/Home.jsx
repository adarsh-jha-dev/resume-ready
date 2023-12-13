// Home.jsx
import React, { useContext, useEffect, useState } from "react"
import axios from "axios"
import UserContext from "../context/userContext.jsx"
import NavBar from "./Navbar.jsx"
import PostItem from "./PostItem/PostItem.jsx"

const Home = () => {
  const { user } = useContext(UserContext)
  const [checkUser, setCheckUser] = useState(false)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const token = localStorage.getItem("auth-token")
    setCheckUser(!!token)

    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/posts/fetchallposts`
        )
        setPosts(response.data.data)
      } catch (error) {
        console.error("Error fetching posts:", error)
      }
    }

    fetchPosts()
  }, [])

  return (
    <div className="bg-gradient-to-b from-blue-500 to-indigo-500">
      <NavBar user={user} checkUser={checkUser} />
      <div className="max-w-7xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
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
      </div>
    </div>
  )
}

export default Home
