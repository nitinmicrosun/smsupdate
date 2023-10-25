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
  signout,
  adminprofile,
  profileupdate,
  update_profile,
  dashboard,
  add_admin_service_page,
  update_service_page,
  verify_otp,
  change_pass_page,
  change_pass,
  filter_service,
  transaction_view,
  filter_transaction,
  user_view,
  filter_user,
  mailpage,mailsend
} = require("./../controller/controller");
//router.get("/register", register);
router.get("/",login);
router.post("/register_data_save", register_data_save);
router.post("/login-data-validation", login_data_validation);
router.get("/dashboard", auth,dashboard);
router.get("/add_admin_services_page",auth,add_admin_service_page
);

router.post("/update_service_page", auth,update_service_page);
router.post("/add_admin_service",auth,add_admin_service);
router.post("/verify-otp",verify_otp);

router.post("/update_service",auth,update_service);

router.get("/reservice",auth,resservice);

router.post("/flash",async(req,res)=>{
    res.render("/flash")
  });

  router.get("/signout",signout);

  router.get("/adminprofile",auth,adminprofile);

  router.get("/profileupdate",auth,profileupdate);
  router.get("/change_pass_page",auth,change_pass_page);
  
  router.post("/update_profile",auth,update_profile);
  router.post("/change_pass",auth,change_pass);
  router.post("/filterservice",auth,filter_service);
  router.get("/viewtransaction",auth,transaction_view);
  router.post("/filtertransaction",auth,filter_transaction);
  router.get("/userview",auth,user_view);
  router.post("/filteruser",auth,filter_user);
  router.post("/user_mail_page" ,auth,mailpage)
  router.post("/send_mail" ,auth,mailsend)

module.exports = router;
