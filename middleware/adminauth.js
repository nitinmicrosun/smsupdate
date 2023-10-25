const jwt = require("jsonwebtoken");
const adminModel = require("../src/model/admin");

module.exports = async (req, res, next) => {
  try {
    if (req.cookies.jwt != undefined && req.cookies.jwt != "") {
      const token = req.cookies.jwt;
      const { _id } = jwt.verify(token, process.env.SECRET_KEY);
      req.user = await adminModel.findOne({ _id });
      if (req.user) {
        next();
      } else {
        res.render("login");
      }
    } else {
      res.render("login");
    }
  } catch (error) {
    console.log(error);
    res.redirect("/register");
  }
};
