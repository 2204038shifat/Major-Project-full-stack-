const express = require("express");
const user = require("../models/user");
const passport = require("passport");
const router = express.Router();

const { SaveRedirectUrl } = require("../middleware");
const { signUp, signUpPostReq, loginRoute, loginPostReq, logOut } = require("../controllers/users");



router.get("/signup",signUp);

router.post("/signup",signUpPostReq);

// Login page
router.get("/login", SaveRedirectUrl,loginRoute);

// Login POST
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
 loginPostReq
);

// Logout
router.get("/logout",logOut);

module.exports = router;