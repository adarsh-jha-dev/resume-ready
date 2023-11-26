import { Router } from "express"
import { upload } from "../middlewares/multer.middleware.js"
import fetchUser from "../middlewares/fetchUser.middleware.js"
import makePost from "../controllers/makePost.controller.js"

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

export default router
