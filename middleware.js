const listing = require("./models/listing");
const review = require("./models/review");

module.exports.isLoggedIn = (req, res, next) => {

  // console.log(req.path,req.originalUrl);

  if (!req.isAuthenticated()) {

    req.session.redirectUrl = req.originalUrl;

    req.flash("error", "Please log in first");
    return res.redirect("/login");
  }

  next();
};

module.exports.SaveRedirectUrl = (req,res,next)=>{
  if(req.session.redirectUrl){
      res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
}

module.exports.isOwner = async (req,res,next)=>
{
  let {id} = req.params;
  let Listing = await listing.findById(id);
  if(!Listing.owner._id.equals(req.user._id)){
    req.flash("error","You are not the owner of this listing");
    return res.redirect(`/listing/${id}`);
  }
  next();

}

module.exports.isReviewOwner = async (req,res,next)=>
{
  let {reviewId,id} = req.params;
  let reviews = await review.findById(reviewId);
  if(!reviews.author._id.equals(req.user._id)){
    req.flash("error","You are not the owner of this review");
    return res.redirect(`/listing/${id}`);
  }
  next();

}