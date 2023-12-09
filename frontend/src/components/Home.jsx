import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import NavBar from "./NavBar.jsx" // Assuming you have a NavBar component
import PostItem from "./PostItem" // Assuming you have a PostItem component
import { FaPlus } from "react-icons/fa6"
import axios from "axios"
import UserContext from "../context/userContext.jsx"
// Import your own Plus icon SVG

const Home = () => {
  const { user } = useContext(UserContext)
  const [checkUser, setCheckUser] = useState(false)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const token = localStorage.getItem("auth-token")
    setCheckUser(!!token)

    // Fetch posts from the backend and update the state
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
    <div>
      {/* Navbar */}
      <NavBar user={user} checkUser={checkUser} />

      {/* Main Feed */}
      <div className="max-w-2xl mx-auto mt-8">
        {posts.map((post) => (
          <PostItem key={post._id} {...post} />
        ))}
      </div>
    </div>
  )
}

export default Home
