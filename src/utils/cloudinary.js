import { v2 as cloudinary } from "cloudinary"
import fs from "fs"
import { ApiError } from "./apiError.util.js"

cloudinary.config({
  cloud_name: `${process.env.CLOUDINARY_CLOUD_NAME}`,
  api_key: `${process.env.CLOUDINARY_API_KEY}`,
  api_secret: `${process.env.CLOUDINARY_API_SECRET}`,
})

const uploadToCloudinary = async (localFilePath) => {
  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    })
    fs.unlinkSync(localFilePath)
    return response
  } catch (error) {
    fs.unlinkSync(localFilePath)
    return null
  }
}

const deleteFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId, (err, res) => {
      if (err) {
        console.log(err.message)
      } else {
        console.log(`Asset deleted successfully`)
      }
    })
  } catch (error) {
    throw new ApiError(error.code, error.message)
  }
}

export { uploadToCloudinary, deleteFromCloudinary }
