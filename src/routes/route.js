const express = require("express");
const router = express.Router();
const auth = require("../../middleware/adminauth");
const multer = require("multer");
const upload = multer({ dest: "../../public/images/" })
let {
  register,
  register_data_save,
  login_data_validation,
  update_service,
  resservice,
  add_admin_service,
  login,
  signout
} = require("./../controller/controller");
router.get("/register", register);
router.get("/",login);
router.post("/register_data_save", register_data_save);
router.post("/login-data-validation", login_data_validation);
router.get("/dashboard", auth, async (req, res) => {
  res.render("dashboard");
});
router.get("/add_admin_services_page", async (req, res) => {
    res.render("addservice");
  }
);

router.post("/update_service_page", async (req, res) => {
  console.log(req.body.id);
  res.render("updateservice" ,{data:req.body.id} );
}
);
router.post("/add_admin_service",add_admin_service);

router.post("/update_service",update_service);

router.get("/reservice",resservice);

  router.post("/flash",async(req,res)=>{
    res.render("/flash")
  })

  router.get("/signout",signout);

module.exports = router;
