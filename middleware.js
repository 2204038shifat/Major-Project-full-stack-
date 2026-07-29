module.exports.isLoggedIn = (req,res,next)=>
{
  if(!req.isAuthenticate())
  {
    req.flash("error","Please sign up fisrt");
    return res.redirect("/login");
    next();
  }
}