const express = require("express");
const router = express.Router();
const auth = require("../../middleware/adminauth");
let {
  register,
  register_data_save,
  login_data_validation,adddata,
  resservice
} = require("./../controller/controller");
router.get("/register", register);
router.post("/register_data_save", register_data_save);
router.post("/login-data-validation", login_data_validation);
router.get("/dashboard", auth, async (req, res) => {
  res.render("dashboard");
});
router.get("/add",async(req,res)=>{
  

  res.render("add",{messages:undefined});
});


router.post("/adddata", adddata);


router.get("/reservice",resservice);
  // router.post("/adddata",adddata);

  
  router.post("/flash",async(req,res)=>{
    res.render("/flash")
  })

module.exports = router;
