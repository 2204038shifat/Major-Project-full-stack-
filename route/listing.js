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

const listing  = require('../models/listing.js');




//delete Route

router.delete("/:id",async (req,res)=>
{
  let {id}=req.params;
 let deleteListing=  await listing.findByIdAndDelete(id);
 console.log(deleteListing);
 res.redirect("/listing");

  //  res.send("delete req send");

})





// Edit and Update Route

router.get("/:id/edit",async (req,res)=>
{
  let {id}=req.params;
  let listings = await listing.findById(id);
  console.log(listings);
  res.render("listing/edit.ejs",{listings});
})


// Update Route

router.put('/:id',async(req,res)=>
{
  let {id}=req.params;
 await listing.findByIdAndUpdate(id,{...req.body.listing});
//  res.redirect(`/listing/${id}`);
res.redirect("/listing");

})



//Create New Route

router.get('/new',(req,res)=>
{

  // res.send("req accedpted")
  res.render("listing/new.ejs");
})


  router.post("router", async (req, res) => {
  let { listing } = req.body;

  listing.image = {
    url: listing.image,
    filename: "listingimage"
  };

  const newListing = new Listing(listing);
  await newListing.save();

  res.redirect("/listing");
});
// index route

router.get('/',async (req,res)=>
{
  const allListing = await listing.find({});
  // console.log(allListing);
    res.render('listing/index.ejs',{allListing});
})


//show listing route 

router.get('/:id',async (req,res)=>
{
  let {id} = req.params;
  const findListData = await listing.findById(id).populate("reviews");
  console.log(findListData);
  res.render("listing/show.ejs",{findListData});

})

module.exports =  router;