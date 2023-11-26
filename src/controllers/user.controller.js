import { User } from "../models/user.model.js"
import { ApiError } from "../utils/apiError.util.js"
import { ApiResponse } from "../utils/apiResponse.util.js"
import { asyncHandler } from "../utils/asyncHandler.util.js"
import { uploadToCloudinary } from "../utils/cloudinary.js"

const registerUser = asyncHandler(async (req, res) => {
  // take the details from the user
  // validate the details - check for empty inputs
  // look for user in the database with the same credentials
  // check for image fields
  // upload the image fields to cloudinary
  // if an user with the same credentials doesn't exist, save the new user
  // return the response (new user) if not any errors

  const { firstname, lastname, username, email, password } = req.body

  if (
    [firstname, lastname, username, email, password].some(
      (field) => field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required for signing up")
  }

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  })

  if (existingUser) {
    throw new ApiError(409, "A user with this email or username already exists")
  }

  let coverImageLocalPath
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path
  }

  let avatarLocalPath = req.files?.avatar[0]?.path
  if (!avatarLocalPath) {
    throw new ApiError(409, "Avatar is required")
  }

  let avatar = await uploadToCloudinary(avatarLocalPath)
  const coverImage = await uploadToCloudinary(coverImageLocalPath)
  if (!avatar) {
    throw new ApiError(409, "Avatar is required")
  }

  const user = await User.create({
    firstname,
    lastname,
    username,
    email,
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  })

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user")
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"))
})

export default registerUser
