import { Router } from "express"
import fetchUser from "../middlewares/fetchUser.middleware.js"
import { makeComment } from "../controllers/makeComment.controller.js"
import { deleteComment } from "../controllers/deleteComment.controller.js"
import { likeComment } from "../controllers/likeComment.controller.js"
import { getComments } from "../controllers/getComment.controller.js"
import { editComment } from "../controllers/editComment.controller.js"

const router = Router()

router.route("/create/:id").post(fetchUser, makeComment)
router.route("/delete/:id").delete(fetchUser, deleteComment)
router.route("/like/:id").put(fetchUser, likeComment)
router.route("/fetchall/:id").get(fetchUser, getComments)
router.route("/edit/:id").put(fetchUser, editComment)

export default router
