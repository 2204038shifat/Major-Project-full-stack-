const express = require("express");
// const router= express.Router();
const router = express.Router({ mergeParams: true });





const review  = require('../models/review.js');
const listing  = require('../models/listing.js');


//Review Request 

router.post("/",async(req,res)=>
{
  let listing_id = await listing.findById(req.params.id);
  
  // console.log(req.body);
  // console.log(req.body.review);

  let newReview = new review(req.body.Review);
  await listing_id.reviews.push(newReview);
  await newReview.save();
  await listing_id.save();
  console.log("Review is added succesfully");
  res.redirect(`/listing/${listing_id.id}`);
})


// delele review route

router.delete("/:reviewId",async(req,res)=>
{
  let {id ,reviewId}= req.params;

  await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
  await review.findByIdAndDelete(reviewId);
  res.redirect(`/listing/${id}`);

})





module.exports = router