import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Spinner from "./Spinner"
import UserContext from "../context/userContext"
import NavBar from "./Navbar"

const User = () => {
  const { id } = useParams()
  const { user } = useContext(UserContext)
  const [profile, setProfile] = useState({})
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [following, setFollowing] = useState(false)
  const [checkUser, setCheckUser] = useState(false)

  useEffect(() => {
    setLoading(true)

    try {
      const fetchUser = async () => {
        const userResponse = await axios.get(
          `${
            import.meta.env.VITE_APP_BACKEND_BASE_URL
          }/api/v1/users/getuser/${id}`
        )
        setProfile(userResponse.data.data)
      }

      fetchUser()
      if (user) {
        setCheckUser(user._id === profile._id)
      }

      setLoading(false)
    } catch (error) {
      console.log(error)
      setError(error.message)
    }
  }, [id])

  const handleFollow = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const followResponse = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/api/v1/users/follow/${
          profile._id
        }`,
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      )

      if (response.data.status === 200) {
        setFollowing(true)
      } else {
        setError("Some error occured")
      }
    } catch (error) {
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const handleUnfollow = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const unfollowResponse = await axios.put(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/api/v1/users/unfollow/${
          profile._id
        }`,
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      )

      if (unfollowResponse.data.status === 200) {
        setFollowing(false)
      } else {
        setError("Some error occured")
      }
    } catch (error) {
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center">
        <NavBar />
        <h3>{error}</h3>
      </div>
    )
  } else {
    if (loading) {
      return (
        <>
          <NavBar />
          <Spinner message="Fetching profile details..." textColor="green" />
        </>
      )
    } else {
      return (
        <>
          <NavBar />
          <div className="h-full flex justify-center">
            <div className="h-[400px] w-auto rounded-lg flex justify-center">
              <img
                className="h-full w-auto"
                src={profile?.coverImage}
                alt="coverImage"
              />
            </div>
            <div className="w-[800px] mt-12 m-4 h-auto flex items-center bg-gray-700 rounded-lg shadow-md overflow-hidden">
              <img
                src={profile?.avatar}
                alt="avatar"
                className="w-24 m-3 h-full object-cover rounded-l-lg"
              />
              <div className="flex-1 p-4">
                <p className="text-2xl text-start text-white font-bold mb-1">
                  {profile?.username}
                </p>
                <p className="text-white text-start text-lg font-semibold mb-4">
                  {profile?.firstname} {profile?.lastname}
                </p>
                <div className="flex justify-around text-white">
                  <p className="flex m-2 items-center">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5 fill-current mr-1"
                    >
                      <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
                    </svg>
                    <span>{profile && profile?.followers?.length}</span>{" "}
                    Followers
                  </p>
                  <p className="flex items-center">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5 fill-current mr-1"
                    >
                      <path d="M5.566 4.657A4.505 4.505 0 016.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0015.75 3h-7.5a3 3 0 00-2.684 1.657zM2.25 12a3 3 0 013-3h13.5a3 3 0 013 3v6a3 3 0 01-3 3H5.25a3 3 0 01-3-3v-6zM5.25 7.5c-.41 0-.806.055-1.184.157A3 3 0 016.75 6h10.5a3 3 0 012.683 1.657A4.505 4.505 0 0018.75 7.5H5.25z" />
                    </svg>
                    <span>{profile && profile?.posts?.length}</span> Posts
                  </p>
                  <p className="flex items-center">
                    <span>{profile && profile?.comments?.length}</span> Comments
                  </p>
                </div>
                {!checkUser && (
                  <button
                    onClick={() => {
                      following ? handleUnfollow : handleFollow
                    }}
                    className="text-white text-lg w-[200px] mt-4 font-semibold cursor-pointer bg-gray-600 rounded-md p-2 hover:bg-white hover:text-black transition-colors"
                  >
                    {following ? "Following" : "Follow"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )
    }
  }
}

export default User
