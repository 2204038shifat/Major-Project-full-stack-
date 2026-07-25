const express = require("express");
const app = express();
const mongoose = require("mongoose");

const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const ejsMate = require("ejs-mate");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));







const methodOverride = require('method-override');
app.use(methodOverride("_method"));

app.use(express.urlencoded({extended : true}));
app.engine('ejs',ejsMate);


const review  = require('./models/review.js');
const listing  = require('./models/listing.js');

const listings = require("./route/listing.js")
const reviewRouter = require("./route/review.js");
const { Cookie } = require("express-session");



const sessionInfo = {
  secret:"mysupersecretstring",
   resave:false,
    saveUninitialized:true,
    cookie:{
      expires:Date.now() + 7*24*60*60*1000,
      maxAge :  7*24*60*60*1000,
      httpOnly:true
    }
  
}
app.use(session(sessionInfo));
app.use(flash());



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

app.use((req,res,next)=>
{
 res.locals.success =  req.flash("success");
 next();
})


app.use("/listing",listings);



// handle Post Req

// app.post("/listing",async (req,res)=>
// {
  // first way

  // let {title,description,image,price,country,location}=req.body;

  // 2nd way to received data through object 

  // let listing = req.body.listing;
  // console.log(listing);

  // let newListing = new listing(req.body.listing);
  // await newListing.save();
  // res.redirect('/listing');


// })




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


//review route

app.use("/listing/:id/reviews",reviewRouter);



app.get('/',(req,res)=>
{
  res.send("HI,I amn root");
})

app.listen(8080,()=>
{
  console.log("server is listening at port 8080");
})