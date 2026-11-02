const express = require("express");
// const router= express.Router();
const router = express.Router({ mergeParams: true });





const review  = require('../models/review.js');
const listing  = require('../models/listing.js');
const { isLoggedIn, isReviewOwner } = require("../middleware.js");
const { CreateReview, deleteReview } = require("../controllers/reviews.js");


//Review Request 

router.post("/",isLoggedIn,CreateReview);


// delele review route

router.delete("/:reviewId",isLoggedIn,isReviewOwner,deleteReview);


module.exports = router