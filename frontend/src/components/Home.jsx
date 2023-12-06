import React, { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"

const Home = () => {
  const location = useLocation()
  const { user } = location.state || {}
  const [checkUser, setCheckUser] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("auth-token")
    setCheckUser(!!token) // Set checkUser to true if token is present
    console.log(user)
  }, [user])

  return (
    <div>
      {checkUser ? (
        <div>
          <h2>Hello {user.username}</h2>
          <img src={user.avatar} alt="avatar" />
        </div>
      ) : (
        <Link to="/login" className="text-red-600">
          Please login first
        </Link>
      )}
    </div>
  )
}

export default Home
