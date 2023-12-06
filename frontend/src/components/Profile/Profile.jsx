import React from "react"
import { useLocation } from "react-router-dom"

const Profile = () => {
  const location = useLocation()
  const { user } = location.state || {}

  return (
    <div className=" flex justify-center">
      <h1>Hello {user.username}</h1>
      <p>Name : {user.firstname + " " + user.lastname}</p>
      <br />
      <p>Email : {user.email}</p>
      <div className=" flex p-4">
        <img src={user.avatar} className=" w-[400px] m-4" alt="avatar" />
        <img
          src={user.coverImage}
          className=" w-[400px] m-4"
          alt="coverimage"
        />
      </div>
    </div>
  )
}

export default Profile
