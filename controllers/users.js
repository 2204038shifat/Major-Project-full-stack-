module.exports.signUp =  (req, res) => {
  res.render("users/signup.ejs");
}

module.exports.signUpPostReq = async (req, res, next) => {
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
}

module.exports.loginRoute =  (req, res) => {
  res.render("users/login.ejs");
};


module.exports.loginPostReq =  (req, res) => {
    req.flash("success", "Successfully logged in! Welcome to Wanderlust");

    const redirectUrl = res.locals.redirectUrl || "/listing";

    delete req.session.redirectUrl;

    res.redirect(redirectUrl);
  }

  module.exports.logOut =  (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    req.flash("success", "You are logged out");
    res.redirect("/listing");
  });
}