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
    <nav className="flex items-center overflow-hidden justify-between bg-gray-500 rounded-2xl text-white p-4">
      <div>
        <Link
          to="/home"
          className="text-2xl font-bold hover:border-b hover:border-b-white hover:borde transition-all duration-200 ease-in-out"
        >
          Blogstagram
        </Link>
      </div>
      <div className="lg:flex items-center transition-all duration-200 ease-in-out">
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
          <Link
            to="/home"
            className="lg:mr-4 sm:m-1 rounded-2xl p-2 hover:bg-white hover:text-black hover:border hover:rounded-3xl transition-colors duration-200 ease-in-out ml-2"
          >
            Home
          </Link>
          <Link
            to="/makepost"
            className="lg:mr-4 sm:mt-1 rounded-2xl p-2 hover:bg-white hover:text-black hover:border hover:rounded-3xl transition-colors duration-200 ease-in-out ml-2"
          >
            Post <FaPlus className="w-4 h-4 inline" />
          </Link>
          {user ? (
            <Link className="flex justify-center mt-2" to="/profile">
              <div className="w-10 h-10 pt-1 overflow-hidden flex justify-center hover:border-4 hover:border-gray-200 rounded-full">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
          ) : (
            <div className="mt-1 sm:mt-3">
              <Link
                to="/login"
                className="lg:mr-4 rounded-2xl p-2 hover:bg-white hover:text-black hover:border hover:rounded-3xl transition-colors duration-200 ease-in-out ml-2"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="lg:mr-4 rounded-2xl p-2 hover:bg-white hover:text-black hover:border hover:rounded-3xl transition-colors duration-200 ease-in-out ml-2"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default NavBar
