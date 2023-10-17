const express = require("express");
let dotenv = require("dotenv");
dotenv.config();
const app = express();

app.use(express.json());

// You can choose any port you prefer

const path = require("path");
let { connectDB } = require("./db/dbconnection");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

// Define a route for the root URL ("/")

app.use("/", require("./src/routes/route"));

app.set("views", path.join(__dirname, "src/views"));

app.set("view engine", "ejs");

// Start the Express server
connectDB();
app.listen(process.env.port, () => {
  console.log("Server is listening at 3000");
});
