const express = require("express");
const router = express.Router();
let {
  login,
  register,
  register_data_save,
  login_data_validation,
} = require("./../controller/controller");
router.get("/register", register);
router.get("/login", login);
router.post("/register_data_save", register_data_save);
router.post("/login-data-validation", login_data_validation);
// router.post("/dashboard",ab, auth, register_data_save);

module.exports = router;
