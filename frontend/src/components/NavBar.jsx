import React from "react"
import { Link } from "react-router-dom"
import { FaPlus } from "react-icons/fa6"

const NavBar = ({ user, checkUser }) => {
  return (
    <nav className="flex items-center sticky justify-between bg-gray-800 text-white p-4">
      <div>
        <Link to="/home" className="text-2xl font-bold">
          Blogstagram
        </Link>
      </div>
      <div className="flex items-center">
        <Link to="/home" className="mr-4">
          Home
        </Link>
        <Link to="/makepost" className="mr-4">
          Post <FaPlus className="w-4 h-4 inline" />
        </Link>
        <Link to="/search">Search</Link>
        <div className="ml-4">
          {checkUser ? (
            // If user is logged in, show the avatar linking to the profile
            <Link to="/profile">
              <div className="w-8 h-8 overflow-hidden rounded-full">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
          ) : (
            // If no user, show Login and Signup buttons
            <>
              <Link to="/login" className="ml-4">
                Login
              </Link>
              <Link to="/signup" className="ml-4">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default NavBar
