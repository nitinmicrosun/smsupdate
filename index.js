
const cookiparser = require("cookie-parser");
const express = require("express");
let dotenv = require("dotenv");
dotenv.config();
const app = express();
const http=require('http').Server(app);

const session=require("express-session");


app.use(express.json());

app.use(cookiparser());


// You can choose any port you prefer

const path = require("path");
let { connectDB } = require("./db/dbconnection");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
const flash=require("connect-flash");
app.use(flash());
app.use(session({
  secret:"secret key",
  resave:false,
  saveUninitialized:true,
  cookie:{
    maxAge:600000
  }
}))

// Define a route for the root URL ("/")
// const paymentRoute = require('./routes/paymentRoute');

app.use("/", require("./src/routes/route"));
app.use('/',require('./src/routes/paymentRoute'));

app.set("views", path.join(__dirname, "src/views"));

app.set("view engine", "ejs");

// Start the Express server
connectDB();
app.listen(process.env.port, () => {
  console.log("Server is listening at 3000");
});
