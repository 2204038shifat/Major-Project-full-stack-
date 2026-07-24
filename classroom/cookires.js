const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");
const ejsMate = require("ejs-mate");
const flash = require("connect-flash");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"../views"));

app.use(express.urlencoded({extended : true}));

// app.use(
//   session({
//     secret:"mysupersecretstring",
//     resave:false, 
//     // jadio kono change na hoi session a tobu session session store a save hobe
//     saveUninitialized:true,
//     // jei session akhono initialized hoi nai ogula o save hobe
//   })
// );

// ei middleware k ekta alada varibale er modhe use kora jai jeno aro kiso add korte pari

const sessionInfo = {
  secret:"mysupersecretstring",
   resave:false,
    saveUninitialized:true,
  
}

app.use(session(sessionInfo));
// app.use(session(sessionOptions));
app.use(flash());


app.use((req,res,next)=>
{
    //chaile amra variable a save rakhte pari
  res.locals.name = req.session.name;
  res.locals.msgSuccess =  req.flash("success");
  res.locals.msgError = req.flash("Error");
  next();
})

app.get("/register",(req,res)=>
{
  let {name = "anonymous"} = req.query;

  req.session.name =name;
  // chaile req.session er modhe store kore onno route seta abr access o korte pari
  // console.log(req.session);


  // message flash korbe

    if (name==="anonymous"){
      req.flash("Error","Not Register Successfully");
  }
  else{
     req.flash("success","User register successfully");
  }
  
 
res.redirect("/hello"); 
})

app.get("/hello",(req,res)=>
{

  // console.log(req.flash('success'));


  // //chaile amra variable a save rakhte pari
  // res.locals.name = req.session.name;
  // res.locals.msgSuccess =  req.flash("success");
  // res.locals.msgError = req.flash("Error");
   
  // er janno alada middle ware define o korte pari





  res.render("listing/page.ejs");
  // res.render("listing/page.ejs",{name : req.session.name , msg : req.flash('success')});
})



app.get("/reqcount",(req,res)=>
{
  if(req.session.count){
    req.session.count++;
  }
  else{
    req.session.count=1;
  }
  res.send(`you sent a request ${req.session.count} time`)
})


const port = 3030

app.use(cookieParser("secretcode"));

app.get("/getsignedcookie",(req,res)=>
{
  res.cookie("Made-in","Bangladesh",{signed:true});
  res.send("signed cookies sent");
});

app.get("/verify",(req,res)=>
{
  console.log(req.cookies);
  console.log(req.signedCookies); // for asign signed cookie
  res.send("verified");
})



app.get("/Shifat",(req,res)=>
{
  let {Shifat = "replace the name"} = req.cookies;

  //  Shifat name a jadi kono cookie thake tahole take find korbe and print korbe or default hisabe reaplace the name print korbe 

  res.send(`${Shifat}`);
})

app.get("/cookies",(req,res)=>
{
  console.log(req.cookies);

  res.cookie("greet","Assalamualaikum");
  res.cookie("madeIn","Bangladesh");
  res.send("sent you some cookies");
})



app.get("/",(req,res)=>
{
  res.send("this is the indx route ");
})

app.listen(port,()=>
{
  console.log(`Server is listening at http://localhost:${port}`);
})