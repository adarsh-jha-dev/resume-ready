import axios from "axios"
import React, { useState } from "react"
import { FaPencilAlt } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import "./SignUp.css"

const SignUp = () => {
  const navigate = useNavigate()
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
        `http://localhost:8000/api/v1/users/register`,
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
      navigate("/profile", { state: { user: data.createdUser } })
    } catch (error) {
      console.log(error)
      setError(error.message)
      return
    }
    // ...
  }

  return (
    <section>
      <div className="form-box h-[630px]">
        <div className="form-value">
          <form onSubmit={handleSubmit}>
            <h2 className=" mb-10">Sign Up</h2>
            <div className="flex justify-between mb-4">
              <div className="relative avatar-container">
                <label htmlFor="avatar" className="pencil-icon">
                  <FaPencilAlt />
                  <input
                    type="file"
                    id="avatar"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
                <img
                  src={
                    avatar
                      ? URL.createObjectURL(avatar)
                      : "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
                  }
                  alt="Avatar"
                  className="rounded-full h-16 w-16 object-cover"
                />
                <p className="text-xs text-center mt-2">Avatar</p>
              </div>
              <div className="relative avatar-container">
                <label htmlFor="coverImage" className="pencil-icon">
                  <FaPencilAlt />
                  <input
                    type="file"
                    id="coverImage"
                    accept="image/*"
                    onChange={handleCoverImageChange}
                    className="hidden"
                  />
                </label>
                <img
                  src={
                    coverImage
                      ? URL.createObjectURL(coverImage)
                      : "https://png.pngtree.com/png-vector/20190909/ourmid/pngtree-outline-user-icon-png-image_1727916.jpg"
                  }
                  alt="Cover Image"
                  className="rounded-full h-16 w-16 object-cover"
                />
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
            <button
              type="submit"
              className="bg-white mb-4 hover:bg-black hover:text-white transition-all duration-850 ease-in-out"
            >
              Sign Up
            </button>
            <div className="register">
              <p>
                Already have an account <Link to="/login">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default SignUp
