import { Router } from "express"
import { upload } from "../middlewares/multer.middleware.js"
import registerUser from "../controllers/user.controller.js"
import loginUser from "../controllers/login.controller.js"
import deleteUser from "../controllers/deleteUser.controller.js"
import { getUserByUsername } from "../controllers/getUserByUsername.controller.js"
import fetchUser from "../middlewares/fetchUser.middleware.js"
import { getUserById } from "../controllers/getUserByUserId.controller.js"
import { followUser } from "../controllers/followUser.controller.js"
import { getFollowers } from "../controllers/getFollowers.controller.js"
import { getFollowing } from "../controllers/getFollowing.controller.js"
import { UnfollowUser } from "../controllers/unfollowUser.controller.js"

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
router.route("/getuser/:id").get(getUserById)
router.route("/follow/:id").post(fetchUser, followUser)
router.route("/unfollow/:id").put(fetchUser, UnfollowUser)
router.route("/getfollowers/:id").get(fetchUser, getFollowers)
router.route("/getfollowing/:id").get(fetchUser, getFollowing)

export default router
