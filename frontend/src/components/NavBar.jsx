import React, { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { FaPlus, FaBars, FaTimes } from "react-icons/fa"
import UserContext from "../context/userContext"

const NavBar = () => {
  const { user } = useContext(UserContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="flex items-center sticky justify-between bg-gray-800 text-white p-4">
      <div>
        <Link to="/home" className="text-2xl font-bold">
          Blogstagram
        </Link>
      </div>
      <div className="lg:flex items-center">
        <div className="lg:hidden">
          {isMenuOpen ? (
            <FaTimes className="text-2xl cursor-pointer" onClick={toggleMenu} />
          ) : (
            <FaBars className="text-2xl cursor-pointer" onClick={toggleMenu} />
          )}
        </div>
        <div
          className={`lg:flex ${
            isMenuOpen ? "flex flex-col justify-center" : "hidden"
          }`}
        >
          <Link to="/home" className="lg:mr-4 ml-2">
            Home
          </Link>
          <Link to="/makepost" className="lg:mr-4 ml-2">
            Post <FaPlus className="w-4 h-4 inline" />
          </Link>
          <Link to="/search" className="lg:mr-4 ml-2">
            Search
          </Link>
          <div className="ml-4">
            {user ? (
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
      </div>
    </nav>
  )
}

export default NavBar
