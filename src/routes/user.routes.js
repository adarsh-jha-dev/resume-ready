import { Router } from "express"

const router = Router()

router.route("/api/v1/users", userController)
