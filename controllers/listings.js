const Listing = require("../models/listing");

module.exports.deleteListing = async (req,res)=>
{
  let {id}=req.params;
 let deleteListing=  await Listing.findByIdAndDelete(id);
 console.log(deleteListing);
 req.flash("success","Listing successfully deleted")
 res.redirect(`/listing/${id}`);

  //  res.send("delete req send");

};


module.exports.deleteAndUpdate = async (req,res)=>
{
  let {id}=req.params;
  let listings = await Listing.findById(id);
  console.log(listings);
  if(!listings)
  {
    req.flash("error","The Listing You request for does not exist ");
    res.redirect("/listing");
  }
  res.render("listing/edit.ejs",{listings});
}


module.exports.UpdateListing = async(req,res)=>
{
  let {id}=req.params;

 await Listing.findByIdAndUpdate(id,{...req.body.listing});

 req.flash("success","Listing Successfully Updated")
    res.redirect(`/listing/${id}`);
//  res.redirect("/listing");

}

module.exports.CreateNewListing = (req,res)=>
{

  // res.send("req accedpted")
  res.render("listing/new.ejs");
};


module.exports.postListing = async (req, res) => {
  let { listing } = req.body;

  listing.image = {
    url: listing.image,
    filename: "listingimage"
  };

  const newListing = new Listing(listing);
  console.log(req.user);
  newListing.owner = req.user._id;
  await newListing.save();
  req.flash("success","New Listing added successfully");

  res.redirect("/listing");
}


module.exports.IndexRoute = async (req,res)=>
{
  const allListing = await Listing.find({});
  // console.log(allListing);
    res.render('listing/index.ejs',{allListing});
}


module.exports.ShowListing = async (req,res)=>
{
  let {id} = req.params;
  const findListData = await Listing.findById(id).populate( {path:"reviews",
    populate:{
      path:"author"
    }
  }).populate("owner");
  console.log(findListData);

  if(!findListData)
  {
    req.flash("error","The Listing You request does not exist ");
    res.redirect("/listing");
  }

  res.render("listing/show.ejs",{findListData});

};