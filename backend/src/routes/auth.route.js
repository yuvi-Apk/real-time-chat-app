import express from "express";
import {protectRoute} from "../middleware/auth.middleware.js"
import {
  checkAuth,
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.put("/profile-update", protectRoute, updateProfile);

router.get("/check",protectRoute,checkAuth)

//export to the index.js which is the main entry points
export default router;
