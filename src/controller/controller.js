let {
  register_data_save,
  login_data_validation,
  update_service,
  add_admin_service,
  resservice,
  signout,
  adminprofile,
  update_profile,
  verify_otp,
  change_pass,
  filter_service,
  transaction_view,
  filter_transaction,
  user_view,
  filter_user,
  mailsend
} = require("./../service/service");

exports.register = async (req, res) => {
  res.render("register");
};

exports.login = async (req, res) => {
  res.render("adminlogin");
};

exports.register_data_save = async (req, res) => {
  let data = await register_data_save(req);
  if (data.sucess) {
    res.render("otpsend", { data:data.data });
  } else {
    res.send({ staus: 400, message: "not regisred", data: [], sucess: false });
  }
};
exports.login_data_validation = async (req, res) => {
  let data = await login_data_validation(req, res);
  if (data.sucess) {
    res.render("dashboard", { data });
  } else {
    res.send({ staus: 400, message: "not regisred", data: [], sucess: false });
  }
};

exports.dashboard=async(req,res)=>{
  console.log(req.user);
  if (req.user) {

    res.render("dashboard", { data:req.user });
  } else {
    res.send({ staus: 400, message: "not regisred", data: [], sucess: false });
  }
};
exports.add_admin_service_page=async(req,res)=>{
  if (req.user) {
    res.render("addservice", { data:req.user });
  } else {
    res.send({ staus: 400, message: "not regisred", data: [], sucess: false });
  }
};
exports.add_admin_service = async (req, res) => {

  let data = await add_admin_service(req, res);

  if (data.sucess) {
    console.log(data.sucess);
    // req.flash("success","data add succesfully")
    res.redirect("/reservice");
  } else {
    res.send({ staus: 400, message: "not regisred", data: [], sucess: false });
  }
};

exports.update_service_page=async(req,res)=>{
  if (req.user) {
    let data={
      name:req.user.name,
      id:req.body.id
    };
    res.render("updateservice" ,{data} );
  } else {
    res.send({ staus: 400, message: "not regisred", data: [], sucess: false });
  }
};

exports.update_service = async (req, res) => {
  let data = await update_service(req);
  if (data.sucess) {
    res.redirect("/reservice" );
  } else {
    res.send({ staus: 400, message: "not regisred", data: [], sucess: false });
  }
};

exports.resservice = async (req, res) => {
  res.locals.message = req.flash();
  let data = await resservice(req,res);
  if (data.sucess) {
    res.render("viewservice", { service: data.data , data});
  } else {
    res.send({ staus: 400, message: "not applicable service", data: [], sucess: false })
  }
};
exports.signout = async (req, res) => {
  let data = await signout(req, res);
  if (data.sucess) {
    res.redirect("/");
  } else {
    res.send({ staus: 400, message: "not applicable service", data: [], sucess: false })
  }
};

exports.profileupdate = async (req, res) => {
  res.render("profileupdate");
};

exports.update_profile = async (req, res) => {
  let data = await update_profile(req);
  if (data.sucess) {
    res.render("adminprofile", { data });
  } else {
    res.send({ staus: 400, message: "not regisred", data: [], sucess: false });
  }
};
exports.adminprofile = async (req, res) => {
  res.locals.message = req.flash();
  let data = await adminprofile(req, res);
  if (data.sucess) {
    res.render("adminprofile", { data: data.data });
  } else {
    res.send({ staus: 400, message: "not applicable service", data: [], sucess: false })
  }
};
exports.verify_otp = async (req, res) => {
  res.locals.message = req.flash();
  let data = await verify_otp(req, res);
  if (data.sucess) {
    res.render("adminlogin");
  } else {

    res.render("register");
  }
};

exports.change_pass_page = async (req, res) => {
  if (req.user) {
    res.render("changepass",{data:req.user});
  } else {

    res.render("register");
  }
};

exports.change_pass = async (req, res) => {
  let data = await change_pass(req, res);
  if (data.sucess) {
    res.redirect("/signout");
  } else {
    res.send({ staus: 400, message: "not changed", data: [], sucess: false });
  }
};

exports.filter_service = async (req, res) => {
  res.locals.message = req.flash();
  let data = await filter_service(req,res);
  if (data.sucess) {
    res.render("viewservice", { service: data.data , data});
  } else {
    res.send({ staus: 400, message: "not applicable service", data: [], sucess: false })
  }
};

exports.transaction_view = async (req, res) => {
  res.locals.message = req.flash();
  let data = await transaction_view(req,res);
  if (data.sucess) {
    res.render("viewtransaction", { transaction: data.data , data});
  } else {
    res.send({ staus: 400, message: "not applicable service", data: [], sucess: false })
  }
};

exports.filter_transaction = async (req, res) => {
  res.locals.message = req.flash();
  let data = await filter_transaction(req,res);
  if (data.sucess) {
    res.render("viewtransaction", { transaction: data.data , data});
  } else {
    res.send({ staus: 400, message: "not applicable service", data: [], sucess: false })
  }
};



exports.user_view = async (req, res) => {
  res.locals.message = req.flash();
  let data = await user_view(req,res);
  if (data.sucess) {
    res.render("viewuser", { user: data.data , data});
  } else {
    res.send({ staus: 400, message: "not applicable service", data: [], sucess: false })
  }
};

//user filter

exports.filter_user = async (req, res) => {
  res.locals.message = req.flash();
  let data = await filter_user(req,res);
  if (data.sucess) {
    res.render("viewuser", { user: data.data , data});
  } else {
    res.send({ staus: 400, message: "not applicable service", data: [], sucess: false })
  }
};

//mail page

exports.mailpage = async (req, res) => {
  res.render("mailpage",{data:req.user ,to:req.body.email});
};

//mail send
exports.mailsend = async (req, res) => {
  let data = await mailsend(req);
  console.log(data)
  if (data.sucess) {
    res.redirect("/userview" );
  } else {
    res.send({ staus: 400, message: "not regisred", data: [], sucess: false });
  }
};
