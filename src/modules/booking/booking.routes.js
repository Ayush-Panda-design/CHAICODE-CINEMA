import express from "express";
import {authMiddleware} from "../../common/middleware/auth.middleware.js";
import { book } from "./booking.controller.js";

const router = express.Router();

router.put("/:id", authMiddleware, book);

export default router;