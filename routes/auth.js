import { Router } from "express";
import { register, login, getMe } from "../controllers/auth.js";
import { checkAuth } from "../utils/checkAuth.js";
////////////////////////////////

const router = new Router();
//Register
router.post("/register", register);
//logins
router.post("/login", login);
//Get ME
router.get("/me", checkAuth, getMe);
export default router;
