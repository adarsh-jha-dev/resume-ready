import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { FiLogOut } from "react-icons/fi"
import UserContext from "../../context/userContext"

const Profile = () => {
  const { user, logout } = useContext(UserContext)

  const handleLogout = (e) => {
    e.preventDefault()
    localStorage.removeItem("auth-token")
    logout()
  }
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-md">
      {user ? (
        <>
          <div className="relative h-40 mb-8">
            <img
              src={user.coverImage}
              alt="coverimage"
              className="w-full h-full object-cover rounded-t-md"
            />
          </div>
          <div className="flex items-center justify-center mb-4">
            <div className="border-4 border-white overflow-hidden rounded-full">
              <img
                src={user.avatar}
                alt="avatar"
                className="w-32 h-32 object-cover rounded-full"
              />
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-semibold mb-2">{`Hello, ${user.username}`}</h1>
            <p className="text-lg mb-2">{`Name: ${user.firstname} ${user.lastname}`}</p>
            <p className="text-lg mb-4">{`Email: ${user.email}`}</p>
            <div>
              <button
                onClick={handleLogout}
                className="flex items-center bg-red-500 text-white px-4 py-2 rounded-full"
              >
                <FiLogOut className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center">
          <h1 className="text-2xl">
            Please <Link to="/login">Login</Link> first
          </h1>
        </div>
      )}
    </div>
  )
}

export default Profile
