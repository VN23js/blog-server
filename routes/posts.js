import { Router } from "express";

const router = Router();
import { checkAuth } from "../utils/checkAuth.js";
import { createPost, getAll } from "../controllers/posts.js";
import { isAdmin } from "../controllers/auth.js";
/////////////
///Create Post
router.post("/", checkAuth, isAdmin, createPost);
//////////// GET POST
router.get("/", getAll);

export default router;
