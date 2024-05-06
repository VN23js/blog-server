import { Router } from "express";

const router = Router();
import { checkAuth } from "../utils/checkAuth.js";
import { createPost, getAll, getById } from "../controllers/posts.js";
import { isAdmin } from "../controllers/auth.js";
/////////////
///Create Post
router.post("/", checkAuth, isAdmin, createPost);
//////////// GET POST
router.get("/", getAll);

//////////// GET by POSTID "https://lwr1vjxm-3003.euw.devtunnels.ms/api/post:id",
router.get("/:id", getById);
export default router;
