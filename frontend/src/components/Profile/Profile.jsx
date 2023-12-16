import React, { useContext, useState } from "react"
import NavBar from "../Navbar.jsx"
import UserContext from "../../context/userContext.jsx"
import { FiLogOut } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Spinner from "../Spinner.jsx"

export default function Profile() {
  const navigate = useNavigate()
  const { user, logout } = useContext(UserContext)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogout = (e) => {
    e.preventDefault()
    localStorage.removeItem("auth-token")
    logout()
    navigate("/home")
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const deleteResponse = await axios.delete(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/api/v1/users/delete`,
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      )

      logout()
      navigate("/login")
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <NavBar />
      <div className="h-full flex flex-col items-center">
        <div className="w-full max-w-2xl mt-12 m-4 h-auto flex flex-col items-center bg-gray-700 rounded-lg shadow-md overflow-hidden">
          <img
            className="w-full h-[400px] object-cover rounded-lg"
            src={user?.coverImage}
            alt="coverImage"
          />
          <div className="w-full mt-4 p-4">
            <div className="flex items-center">
              <img
                src={user?.avatar}
                alt="avatar"
                className="w-24 h-auto object-cover rounded-full"
              />
              <div className="flex-1 ml-4">
                <p className="text-2xl text-start text-white font-bold mb-1">
                  {user?.username}
                </p>
                <p className="text-white text-start text-lg font-semibold mb-4">
                  {user?.firstname} {user?.lastname}
                </p>
                <div className="flex flex-col sm:flex-row justify-around text-white">
                  <div className="flex m-2 items-center">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5 fill-current mr-1"
                    >
                      <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
                    </svg>
                    <span>{user && user?.followers.length}</span> Followers
                  </div>
                  <div className="flex items-center">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5 fill-current mr-1"
                    >
                      <path d="M5.566 4.657A4.505 4.505 0 016.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0015.75 3h-7.5a3 3 0 00-2.684 1.657zM2.25 12a3 3 0 013-3h13.5a3 3 0 013 3v6a3 3 0 01-3 3H5.25a3 3 0 01-3-3v-6zM5.25 7.5c-.41 0-.806.055-1.184.157A3 3 0 016.75 6h10.5a3 3 0 012.683 1.657A4.505 4.505 0 0018.75 7.5H5.25z" />
                    </svg>
                    <span>{user && user?.posts.length}</span> Posts
                  </div>
                  <div className="flex items-center">
                    <span>{user && user?.comments.length}</span> Comments
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-around mt-4">
              <button
                onClick={handleLogout}
                className="text-white text-lg w-[200px] font-semibold cursor-pointer bg-gray-600 rounded-md p-2 hover:bg-white hover:text-black transition-colors"
              >
                Logout
              </button>
              {loading ? (
                <Spinner message="Please wait..." textColor="white" />
              ) : (
                <button
                  onClick={handleDelete}
                  className="text-white text-lg w-[200px] font-semibold cursor-pointer bg-gray-600 rounded-md sm:text-sm p-2 hover:bg-white hover:text-black transition-colors"
                >
                  Delete Account
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
