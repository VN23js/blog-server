import { Router } from "express";

const router = Router();
import { checkAuth } from "../utils/checkAuth.js";
import {
  createPost,
  getAll,
  getById,
  getMyPosts,
  removePost
} from "../controllers/posts.js";
import { isAdmin } from "../controllers/auth.js";
/////////////
///Create Post
router.post("/", checkAuth, isAdmin, createPost);
//////////// GET POST
router.get("/", getAll);

//////////// GET by POSTID "https://lwr1vjxm-3003.euw.devtunnels.ms/api/post:id",
router.get("/:id", getById);
//////////// GET MY POSTSID "https://lwr1vjxm-3003.euw.devtunnels.ms/api/user/me",
router.get("/user/me", checkAuth, getMyPosts);

//////////// Delete POST
router.delete("/", checkAuth, removePost);

export default router;
