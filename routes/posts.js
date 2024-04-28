import { Router } from "express";

const router = Router();
import { checkAuth } from "../utils/checkAuth.js";
import { createPost } from "../controllers/posts.js";
import { isAdmin } from "../controllers/auth.js";
/////////////
///Create Post
router.post("/", checkAuth, isAdmin, createPost);
///////////
export default router;
