import React, { useContext, useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import axios from "axios"
import "./Login.css"
import { Link, useNavigate } from "react-router-dom"
import UserContext from "../../context/userContext"
import Spinner from "../Spinner"
import NavBar from "../Navbar"

// ... (import statements)

const Login = () => {
  const { user } = useContext(UserContext)
  const { login } = useContext(UserContext)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [disablePassword, setDisablePassword] = useState(true)
  const [error, setError] = useState(null)

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    setLoading(true)
    e.preventDefault() // Prevent the default form submission behavior
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/users/login`,
        {
          username: username,
          password: password,
        }
      )

      if (!response || response.status !== 200) {
        setError("Some error occurred")
        return
      }

      console.log(response.data)
      const data = response.data.data

      const accessToken = data.accessToken
      localStorage.setItem("auth-token", accessToken)
      login(data.user)
      setLoading(false)
      console.log(accessToken)
      navigate("/home")
    } catch (error) {
      setError(error.message)
      console.error(error)
    }
    console.log(username, password)
  }

  return (
    <>
      <NavBar user={user} />
      <section>
        <div className="form-box">
          <div className="form-value">
            <form onSubmit={handleLogin}>
              {" "}
              {/* Add onSubmit event here */}
              <h2>Login</h2>
              <div className="inputbox">
                <ion-icon name="mail-outline"></ion-icon>
                <input
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <label htmlFor="">Username</label>
              </div>
              <div className="inputbox">
                <ion-icon name="lock-closed-outline"></ion-icon>
                <input
                  type={disablePassword ? "password" : "text"}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label htmlFor="">Password</label>
              </div>
              <div className="forget">
                <label htmlFor="">
                  <input type="checkbox" />
                  Remember Me <a href="#">Forget Password</a>
                </label>
              </div>
              <button
                type="submit"
                className="bg-white mb-4 hover:bg-black hover:text-white transition-all duration-850 ease-in-out"
              >
                Log in
              </button>{" "}
              {/* Remove onClick here */}
              <div className="register">
                <p>
                  Don't have an account <Link to="/signup">Register</Link>
                </p>
              </div>
            </form>
            {loading ? <Spinner message="Logging In..." /> : null}
          </div>
        </div>
      </section>
    </>
  )
}

export default Login
