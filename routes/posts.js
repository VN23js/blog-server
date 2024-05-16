import { Router } from "express";

const router = Router();
import { checkAuth } from "../utils/checkAuth.js";
import {
  createPost,
  getAll,
  getById,
  getMyPosts,
  removePost,
  updatePost,
  getByIdEdit2,
  getPostComments
} from "../controllers/posts.js";
import { isAdmin } from "../controllers/auth.js";
/////////////
///Create Post
router.post("/", checkAuth, isAdmin, createPost);
//////////// GET POST
router.get("/", getAll);

//////////// GET by POSTID "https://lwr1vjxm-3003.euw.devtunnels.ms/api/posts/:id",
router.get("/:id", getById);
//////////// GET MY POSTSID "https://lwr1vjxm-3003.euw.devtunnels.ms/api/user/me",
router.get("/user/me", checkAuth, getMyPosts);
router.get("/:id/edit", checkAuth, getByIdEdit2);

//////////// Delete POST
router.delete("/:id", checkAuth, removePost);

//////////// Update POST
router.put("/:id", checkAuth, updatePost);

//////////// GET MY POSCOMENTS "https://lwr1vjxm-3003.euw.devtunnels.ms/api/comments/:id",
router.get("/comments/:id", getPostComments);
export default router;
