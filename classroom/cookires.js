const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");




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

app.get("/register",(req,res)=>
{
  let {name = "anonymous"} = req.query;
  
  req.session.name =name,
  // chaile req.session er modhe store kore onno route seta abr access o korte pari
  console.log(req.session);
  res.redirect("/hello"); 
})

app.get("/hello",(req,res)=>
{
  res.send(`Hello ,${req.session.name}`);
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