const express = require("express");
const user = require("../models/user");
const router= express.Router();



router.get("/signup",(req,res)=>
{
  res.render("users/signup.ejs")
})

router.post("/signup",async(req,res)=>
{
  try{
     let {username,email,password} = req.body;
  const newUser = new user({username,email});
  const registerUser = await user.register(newUser,password);
  console.log(registerUser);
  req.flash("success","Welcome to Wonderlust");
  res.redirect("/listing");

  }catch(e)
  {
    req.flash("error",e.message);
    res.redirect("/signup");
  }
 

})



// router.get("/login",(req,res)=>
// {
//    res.render()
// })
module.exports = router