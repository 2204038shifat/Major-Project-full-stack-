const express = require("express");
const user = require("../models/user");
const passport = require("passport");
const router = express.Router();

const { SaveRedirectUrl } = require("../middleware");

router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

router.post("/signup", async (req, res, next) => {
  try {
    let { username, email, password } = req.body;

    const newUser = new user({
      username,
      email,
    });

    const registerUser = await user.register(newUser, password);

    req.login(registerUser, (err) => {
      if (err) {
        return next(err);
      }

      req.flash("success", "Welcome to Wanderlust!");
      res.redirect("/listing");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
});

// Login page
router.get("/login", SaveRedirectUrl, (req, res) => {
  res.render("users/login.ejs");
});

// Login POST
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    req.flash("success", "Successfully logged in! Welcome to Wanderlust");

    const redirectUrl = res.locals.redirectUrl || "/listing";

    delete req.session.redirectUrl;

    res.redirect(redirectUrl);
  }
);

// Logout
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    req.flash("success", "You are logged out");
    res.redirect("/listing");
  });
});

module.exports = router;