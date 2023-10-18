let {
  register_data_save,
  login_data_validation,
  update_service,
  add_admin_service,
  resservice
} = require("./../service/service");

exports.register = async (req, res) => {
  res.render("register");
};

exports.login = async (req, res) => {
  res.render("login");
};

exports.register_data_save = async (req, res) => {

  let data = await register_data_save(req);
  if (data.sucess) {
    res.render("login", { data });
  } else {
    res.send({ staus: 400, message: "not regisred", data: [], sucess: false });
  }
};
exports.login_data_validation = async (req,res) => {
  let data = await login_data_validation(req, res);
  if (data.sucess) {
    res.render("dashboard", { data });
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

exports.update_service = async (req, res) => {
  console.log("id",req);
  let data = await update_service(req);
  if (data.sucess) {
    res.redirect("/reservice");
  } else {
    res.send({ staus: 400, message: "not regisred", data: [], sucess: false });
  }
};

exports.resservice=async(req,res)=>{
  res.locals.message=req.flash();
  let data=await resservice(res);
  if (data.sucess){
   res.render("viewservice",{data:data.data});
 }else {
   res.send({staus: 400, message: "not applicable service", data: [], sucess: false })
 }
}