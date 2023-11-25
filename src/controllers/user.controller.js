import { User } from "../models/user.model"
import { ApiError } from "../utils/apiError.util"
import { ApiResponse } from "../utils/apiResponse.util"
import { asyncHandler } from "../utils/asyncHandler.util"

const registerUser = asyncHandler(async (req, res) => {
  // take the details from the user
  // validate the details - check for empty inputs
  // look for user in the database with the same credentials
})
