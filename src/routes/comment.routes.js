import { Router } from "express"
import fetchUser from "../middlewares/fetchUser.middleware.js"
import { makeComment } from "../controllers/makeComment.controller.js"

const router = Router()

router.route("/create/:id").post(fetchUser, makeComment)

export default router
