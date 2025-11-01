import express from "express";
import passport from "passport";
import {
  googleLoginSuccess,
  googleLoginFailure,
  getUserProfile,
} from "../controller/auth.controller.js";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/google/callback",passport.authenticate("google", {failureRedirect: "/api/auth/failure", }),googleLoginSuccess);

router.get("/failure", googleLoginFailure);
router.get("/profile", getUserProfile);

export default router;
