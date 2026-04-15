import { Router } from "express";
import { register, login } from "./auth.controller.js";
import { validateBody } from "../../common/middleware/validate.middleware.js";

const router = Router();

router.post("/register", validateBody(["email", "password"]), register);
router.post("/login", validateBody(["email", "password"]), login);

export default router;