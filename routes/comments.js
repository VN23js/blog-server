import { Router } from "express";
import { checkAuth } from "../utils/checkAuth.js";
import { createComment } from "../controllers/comments.js";
const router = new Router();

//Create Comment
////////////// GET by POSTID "https://lwr1vjxm-3003.euw.devtunnels.ms/api/comments/:id",
router.post("/:id", checkAuth, createComment);
export default router;
