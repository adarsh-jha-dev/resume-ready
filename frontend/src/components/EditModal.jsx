import React, { useState } from "react"
import { AiOutlineClose } from "react-icons/ai"

const EditModal = ({ post, onEdit, onCancel }) => {
  const [editedPost, setEditedPost] = useState({
    title: post.title,
    content: post.content,
    photos: [...post.photos], // Assuming post.photos is an array of objects with URLs
    videos: [...post.videos], // Assuming post.videos is an array of objects with URLs
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditedPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }))
  }
  const handleFileChange = (e, fileType) => {
    const files = e.target.files
    setEditedPost((prevPost) => ({
      ...prevPost,
      [fileType]: [...prevPost[fileType], ...files],
    }))
  }

  const handleRemoveFile = (index, fileType) => {
    setEditedPost((prevPost) => {
      const updatedFiles = [...prevPost[fileType]]
      updatedFiles.splice(index, 1)
      return { ...prevPost, [fileType]: updatedFiles }
    })
  }

  const handleEdit = () => {
    onEdit(editedPost)
  }

  const handleCancel = () => {
    onCancel()
  }

  return (
    <div id="edit-modal" className="modal">
      <div className="modal-content bg-gray-500 rounded-xl m-1 p-4">
        <button
          type="button"
          className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={onCancel}
        >
          <AiOutlineClose className="w-3 h-3" />
          <span className="sr-only">Close modal</span>
        </button>

        <div className="text-center bg-gray-400 p-4 rounded-xl">
          <h2 className="text-3xl font-bold mb-6 text-center text-green-600">
            Edit Post
          </h2>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-start text-2xl font-medium text-black"
              >
                Title:
              </label>
              <input
                className="m-1 p-3 rounded-2xl bg-gray-200 text-black text-xl w-full border focus:outline-none focus:ring focus:border-blue-300"
                type="text"
                id="title"
                name="title"
                value={editedPost.title}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-start text-black"
              >
                Content:
              </label>
              <textarea
                className="mt-1 text-black p-3 w-full h-[250px] border rounded-3xl bg-gray-200 focus:outline-none focus:ring focus:border-blue-300"
                id="content"
                name="content"
                value={editedPost.content}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="images"
                className="block text-sm text-start font-medium text-gray-700"
              >
                Images:
              </label>
              <input
                type="file"
                id="images"
                name="images"
                multiple
                accept="image/*"
                onChange={(e) => handleFileChange(e, "photos")}
              />
              <div className="flex space-x-2 mt-2">
                {editedPost.photos.map((file, index) => (
                  <div
                    key={index}
                    className="relative group flex-shrink-0 w-20 h-20"
                  >
                    {file instanceof File ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index}`}
                        className="w-full h-full object-cover cursor-pointer transition duration-300 transform group-hover:shadow-lg rounded-md"
                      />
                    ) : (
                      <img
                        src={file.url} // Assuming the file is already an object with a URL
                        alt={`Preview ${index}`}
                        className="w-full h-full object-cover cursor-pointer transition duration-300 transform group-hover:shadow-lg rounded-md"
                      />
                    )}
                    <AiOutlineClose
                      onClick={() => handleRemoveFile(index, "photos")}
                      className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label
                htmlFor="videos"
                className="block text-sm text-start font-medium text-gray-700"
              >
                Videos:
              </label>
              <input
                type="file"
                id="videos"
                name="videos"
                multiple
                accept="video/*"
                onChange={(e) => handleFileChange(e, "videos")}
              />
              <div className="flex space-x-2 mt-2">
                {editedPost.videos.map((file, index) => (
                  <div
                    key={index}
                    className="relative group flex-shrink-0 w-20 h-20"
                  >
                    {file instanceof File ? (
                      <video
                        autoPlay
                        controls={false}
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index}`}
                        className="w-full h-full object-cover cursor-pointer transition duration-300 transform group-hover:shadow-lg rounded-md"
                      />
                    ) : (
                      <video
                        autoPlay
                        controls={false}
                        src={file.url} // Assuming the file is already an object with a URL
                        alt={`Preview ${index}`}
                        className="w-full h-full object-cover cursor-pointer transition duration-300 transform group-hover:shadow-lg rounded-md"
                      />
                    )}
                    <AiOutlineClose
                      onClick={() => handleRemoveFile(index, "videos")}
                      className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-around">
              <button
                className="w-full bg-green-500 text-white p-3 rounded-xl m-2 hover:bg-green-700 focus:outline-none focus:ring focus:border-blue-300"
                type="button"
                onClick={handleEdit}
              >
                Update Post
              </button>
              <button
                className="w-full bg-red-500 text-white p-3 rounded-xl m-2 hover:bg-green-700 focus:outline-none focus:ring focus:border-blue-300"
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditModal
