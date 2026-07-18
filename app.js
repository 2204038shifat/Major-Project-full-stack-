const express = require("express");
const app = express();
const mongoose = require("mongoose");

const path = require("path");
const ejsMate = require("ejs-mate");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

const methodOverride = require('method-override');
app.use(methodOverride("_method"));

app.use(express.urlencoded({extended : true}));
app.engine('ejs',ejsMate);

const listing  = require('./models/listing.js');
const review  = require('./models/review.js');

const mongoUrl = "mongodb://127.0.0.1:27017/wanderlust"

main().then(()=>
{
  console.log("DB connected successfully")
}).catch((err)=>
{
  console.log(err);
  
});
async function main() {
  await mongoose.connect(mongoUrl)
  
}


//delete Route

app.delete("/listing/:id",async (req,res)=>
{
  let {id}=req.params;
 let deleteListing=  await listing.findByIdAndDelete(id);
 console.log(deleteListing);
 res.redirect("/listing");

  //  res.send("delete req send");

})





// Edit and Update Route

app.get("/listing/:id/edit",async (req,res)=>
{
  let {id}=req.params;
  let listings = await listing.findById(id);
  console.log(listings);
  res.render("listing/edit.ejs",{listings});
})


// Update Route

app.put('/listing/:id',async(req,res)=>
{
  let {id}=req.params;
 await listing.findByIdAndUpdate(id,{...req.body.listing});
//  res.redirect(`/listing/${id}`);
res.redirect("/listing");

})



//Create New Route

app.get('/listing/new',(req,res)=>
{

  // res.send("req accedpted")
  res.render("listing/new.ejs");
})


// handle Post Req

app.post("/listing",async (req,res)=>
{
  // first way

  // let {title,description,image,price,country,location}=req.body;

  // 2nd way to received data through object 

  // let listing = req.body.listing;
  // console.log(listing);

  // let newListing = new listing(req.body.listing);
  // await newListing.save();
  // res.redirect('/listing');


  app.post("/listing", async (req, res) => {
  let { listing } = req.body;

  listing.image = {
    url: listing.image,
    filename: "listingimage"
  };

  const newListing = new Listing(listing);
  await newListing.save();

  res.redirect("/listing");
});


})






// index route

app.get('/listing',async (req,res)=>
{
  const allListing = await listing.find({});
  // console.log(allListing);
    res.render('listing/index.ejs',{allListing});
})


//show listing route 

app.get('/listing/:id',async (req,res)=>
{
  let {id} = req.params;
  const findListData = await listing.findById(id);
  console.log(findListData);
  res.render("listing/show.ejs",{findListData});

})



// app.get('/test',async (req,res)=>
// {
//   let sampleListing = new listing(
//     {
//       title:"My New Vilal",
//       description:"by the branch",
//       price: 1200,
//       locaiton:"dhaka,bangladesh",
//       country : "bangladesh"
//     }
//   )

//   await sampleListing.save();
//   console.log("sample was saved");

//   res.send("successful testing");
// })


//Review Request 

app.post("/listing/:id/reviews",async(req,res)=>
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



app.get('/',(req,res)=>
{
  res.send("HI,I amn root");
})

app.listen(8080,()=>
{
  console.log("server is listening at port 8080");
})