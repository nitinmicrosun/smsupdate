const cookiparser = require("cookie-parser");
const express = require("express");
const session=require('express-session');

//const flash=require('express-flash');
const app = express();
const path = require("path");
app.use(cookiparser());



app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
let { connectDB } = require("./db/dbconnection");


app.use(express.static(path.join(__dirname, "/public")));

// Define a route for the root URL ("/")

//app.use(require('flash')());
const flash = require("connect-flash");
app.use(flash());
app.use(session({
  secret:"secret key",
  resave:false,
  saveUninitialized:true,
  cookie:{
    maxAge:600000
  }
}))


 app.use("/", require("./src/routes/route"));

app.set("views", path.join(__dirname, "src/views"));






let dotenv = require("dotenv");
dotenv.config();

 app.get('/',async(req,res)=>{
   res.locals.message=req.flash();
   console.log(req.flash())
     req.flash("success","Service added")
   res.render('service')
 })
 app.get("/add",async(req,res)=>{
   res.render("add");
 });
 app.post('/',async(req,res)=>{
   console.log("abnsb",req.body)
   const{name,price,category,duration}=req.body;

   if(name&&price&&category&&duration){
     req.flash("success","Service added")
     res.render("service")
   }
   else{
 
       req.flash("error","Please fill all the required entries")
       res.render('add')
   }

 })




// You can choose any port you prefer





// Start the Express server
connectDB();
app.listen(process.env.port, () => {
  console.log(`Server is listening at  ${process.env.port}`);
});
