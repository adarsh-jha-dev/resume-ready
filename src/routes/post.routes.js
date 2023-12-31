import { Router } from "express"
import { upload } from "../middlewares/multer.middleware.js"
import fetchUser from "../middlewares/fetchUser.middleware.js"
import makePost from "../controllers/makePost.controller.js"
import { deletePost } from "../controllers/deletePost.controller.js"
import { likePost } from "../controllers/likePost.controller.js"
import { getPosts } from "../controllers/getPosts.controller.js"
import { getUserPosts } from "../controllers/getUserPost.controller.js"
import { getUserLikedPosts } from "../controllers/getUserLikedPosts.controller.js"
import { editPost } from "../controllers/editPost.controller.js"
import { getComments } from "../controllers/getComments.controller.js"
import { getPostById } from "../controllers/getPostById.controller.js"
import { dislikePost } from "../controllers/dislikePost.controller.js"
import { isLiked } from "../controllers/isLiked.controller.js"

const router = Router()

router.route("/createnewpost").post(
  fetchUser,
  upload.fields([
    {
      name: "photos",
      maxCount: 10,
    },
    {
      name: "videos",
      maxCount: 4,
    },
  ]),
  makePost
)

router.route("/fetchallposts").get(getPosts)
router.route("/deletepost/:id").delete(fetchUser, deletePost)
router.route("/likepost/:id").put(fetchUser, likePost)
router.route("/dislike/:id").put(fetchUser, dislikePost)
router.route("/isliked/:id").get(fetchUser, isLiked)
router.route("/fetchuserposts/:id").get(fetchUser, getUserPosts)
router.route("/fetchlikedposts/:id").get(fetchUser, getUserLikedPosts)
router.route("/edit/:id").put(fetchUser, editPost)
router.route("/post/:id/comments").get(getComments)
router.route("/getpost/:id").get(getPostById)

export default router
