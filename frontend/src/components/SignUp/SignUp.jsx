import axios from "axios"
import React, { useContext, useState } from "react"
import { FaPencilAlt } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import "./SignUp.css"
import UserContext from "../../context/userContext"
import NavBar from "../Navbar"
import Spinner from "../Spinner"

const SignUp = () => {
  const { user, login } = useContext(UserContext)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [avatar, setAvatar] = useState(null)
  const [coverImage, setCoverImage] = useState(null)
  const [error, setError] = useState(null)

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    setAvatar(file)
  }

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0]
    setCoverImage(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (
      !firstname ||
      !lastname ||
      !coverImage ||
      !avatar ||
      !email ||
      !password
    ) {
      setError("All fields are necessary")
      setLoading(false)
      return
    }

    try {
      const formData = new FormData()
      formData.append("firstname", firstname)
      formData.append("lastname", lastname)
      formData.append("username", username)
      formData.append("email", email)
      formData.append("password", password)
      formData.append("avatar", avatar)
      formData.append("coverImage", coverImage)

      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/api/v1/users/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )

      if (!response) {
        setError("Some error occurred")
        return
      }
      const data = response.data.data
      login(data.createdUser)
      localStorage.setItem("auth-token", data.accessToken)
      setLoading(false)
      navigate("/profile")
    } catch (error) {
      console.log(error)
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <>
      <NavBar user={user} />
      <section>
        <div className="form-box h-[630px]">
          <div className="form-value flex flex-col justify-center">
            <h3 className="text-white text-center">{error}</h3>
            <form onSubmit={handleSubmit}>
              <h2 className=" mb-10">{loading ? "Processing" : "Sign Up"}</h2>
              <div className="flex justify-between mb-4">
                <div className="relative avatar-container">
                  <img
                    src={
                      avatar
                        ? URL.createObjectURL(avatar)
                        : "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
                    }
                    alt="Avatar"
                    className="rounded-full h-16 w-16 object-cover"
                  />
                  <label htmlFor="avatar" className="pencil-icon">
                    <FaPencilAlt className=" ml-10 hover:cursor-pointer" />
                    <input
                      type="file"
                      id="avatar"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                      required
                    />
                  </label>
                  <p className="text-xs text-center mt-2">Avatar</p>
                </div>
                <div className="relative avatar-container">
                  <img
                    src={
                      coverImage
                        ? URL.createObjectURL(coverImage)
                        : "https://png.pngtree.com/png-vector/20190909/ourmid/pngtree-outline-user-icon-png-image_1727916.jpg"
                    }
                    alt="Cover Image"
                    className="rounded-full h-16 w-16 object-cover"
                  />
                  <label htmlFor="coverImage" className="pencil-icon">
                    <FaPencilAlt className=" ml-10 hover:cursor-pointer" />
                    <input
                      type="file"
                      id="coverImage"
                      accept="image/*"
                      onChange={handleCoverImageChange}
                      className="hidden"
                      required
                    />
                  </label>
                  <p className="text-xs text-center mt-2">Cover Image</p>
                </div>
              </div>
              <div className="inputbox">
                <ion-icon name="person-outline"></ion-icon>
                <input
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  placeholder="First Name"
                  required
                />
                <label htmlFor="firstname">First Name</label>
              </div>
              <div className="inputbox">
                <ion-icon name="person-outline"></ion-icon>
                <input
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  placeholder="Last Name"
                  required
                />
                <label htmlFor="lastname">Last Name</label>
              </div>
              <div className="inputbox">
                <ion-icon name="mail-outline"></ion-icon>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  required
                />
                <label htmlFor="username">Username</label>
              </div>
              <div className="inputbox">
                <ion-icon name="mail-outline"></ion-icon>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="inputbox">
                <ion-icon name="lock-closed-outline"></ion-icon>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
                <label htmlFor="password">Password</label>
              </div>
              {!loading ? (
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-white mb-4 hover:bg-black hover:text-white transition-all duration-200 ease-in-out"
                >
                  {loading ? "Singing you up..." : "Sign up"}
                </button>
              ) : (
                <div>
                  <Spinner message="Signing you up..." textColor="white" />
                </div>
              )}
              <div className="register">
                <p>
                  Already have an account <Link to="/login">Login</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default SignUp
