import React, { useState } from "react"

const MakePost = () => {
  const [post, setPost] = useState({
    title: "",
    content: "",
    photos: [],
    videos: [],
  })

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Title"
          maxLength="100"
          style={{
            borderRadius: "10px",
            border: "10px thin light-gray",
          }}
          className=" w-[540px] bg-gray-300 text-black h-[100px] border-gray-700 border-r-[30%] p-[20px] text-3xl shadow-md"
        />
      </div>
    </>
  )
}

export default MakePost
