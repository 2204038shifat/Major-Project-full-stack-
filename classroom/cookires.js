const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");


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