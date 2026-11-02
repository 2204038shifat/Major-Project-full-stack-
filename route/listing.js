const express = require("express");
const router= express.Router();
// const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

const methodOverride = require('method-override');
app.use(methodOverride("_method"));

app.use(express.urlencoded({extended : true}));
app.engine('ejs',ejsMate);

const Listing  = require('../models/listing.js');

const {isLoggedIn, isOwner} = require("../middleware.js");
const { populate } = require("../models/review.js");
const { deleteListing,deleteAndUpdate, UpdateListing, CreateNewListing, postListing, IndexRoute, ShowListing } = require("../controllers/listings.js");




//delete Route

router.delete("/:id",isLoggedIn,isOwner,deleteListing)





// Edit and Update Route

router.get("/:id/edit",isLoggedIn,isOwner,deleteAndUpdate);


// Update Route

router.put('/:id',isLoggedIn,isOwner,UpdateListing);



//Create New Route

router.get('/new',isLoggedIn,CreateNewListing)


router.post("/", isLoggedIn,postListing);


// index route

router.get('/',IndexRoute)


//show listing route 

router.get('/:id',ShowListing);

module.exports =  router;