import { Router } from "express"
import { upload } from "../middlewares/multer.middleware.js"
import registerUser from "../controllers/user.controller.js"
import loginUser from "../controllers/login.controller.js"
import deleteUser from "../controllers/deleteUser.controller.js"
import { getUserByUsername } from "../controllers/getUserByUsername.controller.js"
import fetchUser from "../middlewares/fetchUser.middleware.js"

const router = Router()

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
)

router.route("/login").post(loginUser)
router.route("/delete").delete(fetchUser, deleteUser)
router.route("/username").get(fetchUser, getUserByUsername)

export default router
