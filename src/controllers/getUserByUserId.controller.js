import { User } from "../models/user.model.js"
import { ApiError } from "../utils/apiError.util.js"
import { ApiResponse } from "../utils/apiResponse.util.js"
import { asyncHandler } from "../utils/asyncHandler.util.js"

const getUserById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params

    // Find user by userId
    const user = await User.findById(id)

    if (!user) {
      throw new ApiError(404, "User not found")
    }

    res
      .status(200)
      .json(new ApiResponse(200, user, "User fetched successfully by userId"))
  } catch (error) {
    console.error(error.message)
    if (error instanceof ApiError) {
      throw error // rethrow ApiError instances
    } else {
      throw new ApiError(500, "Internal server error")
    }
  }
})

export { getUserById }
